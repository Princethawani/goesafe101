import pandas as pd
import requests
import pandas as pd


def predict_flood_risk(
    lat: float,
    lon: float,
    area: str,
    api_key: str,
    stage1_model,
    stage2_model,
    topo_df,
    river_df,
    nino_df,
    forecast_days: int = 3
) -> dict:
    """
    Returns flood risk forecast as JSON-serializable dict
    """

    # -----------------------------
    # 1. Fetch forecast using lat/lon
    # -----------------------------
    url = (
        f"http://api.weatherapi.com/v1/forecast.json"
        f"?key={api_key}&q={lat},{lon}&days={forecast_days}&aqi=no&alerts=no"
    )

    response = requests.get(url).json()
    if "error" in response:
        raise RuntimeError(response["error"]["message"])

    # -----------------------------
    # 2. Normalize forecast data
    # -----------------------------
    rows = []
    for day in response["forecast"]["forecastday"]:
        rows.append({
            "Date": day["date"],
            "prcp": day["day"]["totalprecip_mm"],
            "wspd": day["day"]["maxwind_kph"],
            "area": area
        })

    df = pd.DataFrame(rows)
    df["Date"] = pd.to_datetime(df["Date"])

    # -----------------------------
    # 3. Temporal features
    # -----------------------------
    df = df.sort_values("Date")

    df["prcp_1d"] = df["prcp"].shift(1)
    df["prcp_3d"] = df["prcp"].rolling(3, min_periods=1).mean()
    df["prcp_7d"] = df["prcp"].rolling(7, min_periods=1).mean()
    df["prcp_30d"] = df["prcp"].rolling(30, min_periods=1).mean()

    df["prcp_ratio"] = df["prcp_1d"] / (df["prcp_7d"] + 1e-6)
    df["AWI"] = 0.6*df["prcp_1d"] + 0.3*df["prcp_3d"] + 0.1*df["prcp_7d"]

    df["pres_24h_drop"] = 0.0

    # -----------------------------
    # 4. Merge static + climate data
    # -----------------------------
    df = df.merge(topo_df, on="area", how="left")
    df = df.merge(river_df, on="area", how="left")

    df = df.merge(
        nino_df,
        left_on="Date",
        right_on="date",
        how="left"
    ).drop(columns=["date"])

    df["elevation_x_slope"] = df["elevation_m"] * df["avg_slope_deg"]

    # Defaults if missing
    df["trigger_prob"] = 0.0
    df["susceptibility_prob"] = df.get("susceptibility_prob", 1.0)

    df["flood_risk_prob"] = df["trigger_prob"] * df["susceptibility_prob"]

    # -----------------------------
    # 5. Stage 1 inference
    # -----------------------------
    stage1_features = [
        'prcp_1d','prcp_3d','prcp_7d','prcp_30d',
        'prcp_ratio','AWI','pres_24h_drop',
        'wspd','nino34_sst_anomaly','flood_risk_prob'
    ]

    df['flood_risk_stage1'] = (
        stage1_model.predict(df[stage1_features])
        .clip(0, 1)
    )

    # -----------------------------
    # 6. Stage 2 inference
    # -----------------------------
    for col in ['lsi', 'ofi']:
        df[col] = df[col].astype('category').cat.codes

    stage2_features = [
        'elevation_m','avg_slope_deg',
        'distance_km_from_Mulanje','dist_to_water_km',
        'lsi','ofi','flood_risk_prob'
    ]

    df['flood_risk_final'] = (
        stage2_model.predict(df[stage2_features])
        .clip(0, 1)
    )

    # -----------------------------
    # 7. Website-ready JSON
    # -----------------------------
    output = {
        "area": area,
        "lat": lat,
        "lon": lon,
        "forecast": [
            {
                "date": row["Date"].strftime("%Y-%m-%d"),
                "rain_mm": row["prcp"],
                "wind_kph": row["wspd"],
                "flood_risk": round(float(row["flood_risk_final"]), 3)
            }
            for _, row in df.iterrows()
        ]
    }

    return output
