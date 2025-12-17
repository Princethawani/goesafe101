import joblib
import pandas as pd
import os
from predict import predict_flood_risk
from config import API_KEY

from flask import Flask, request, jsonify



app = Flask(__name__)

stage1_model = joblib.load(r"D:\Backup folder\Code\GitHub\goesafe101\AI\models\stage1_model.pkl")
stage2_model = joblib.load(r"D:\Backup folder\Code\GitHub\goesafe101\AI\models\stage2_model.pkl")

topo_df = pd.read_csv(r"D:\Backup folder\Code\GitHub\goesafe101\AI\data\topo.csv")
river_df = pd.read_csv(r"D:\Backup folder\Code\GitHub\goesafe101\AI\data\river.csv")
nino_df = pd.read_csv(r"D:\Backup folder\Code\GitHub\goesafe101\AI\data\nino2025.csv", parse_dates=["date"])


# -----------------------------
# Health check
# -----------------------------
@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})


# -----------------------------
# Prediction endpoint
# -----------------------------
@app.route("/predict", methods=["POST"])
def predict():
    payload = request.get_json()

    # Basic validation
    required = ["lat", "lon", "area"]
    for key in required:
        if key not in payload:
            return jsonify({"error": f"Missing field: {key}"}), 400

    try:
        result = predict_flood_risk(
            lat=float(payload["lat"]),
            lon=float(payload["lon"]),
            area=str(payload["area"]),
            stage1_model=stage1_model,
            stage2_model=stage2_model,
            topo_df=topo_df,
            river_df=river_df,
            nino_df=nino_df
        )
        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
