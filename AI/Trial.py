import joblib
import pandas as pd
import os
from predict import predict_flood_risk
from config import API_KEY



stage1_model = joblib.load(r"D:\Backup folder\Code\GitHub\goesafe101\AI\models\stage1_model.pkl")
stage2_model = joblib.load(r"D:\Backup folder\Code\GitHub\goesafe101\AI\models\stage2_model.pkl")

topo_df = pd.read_csv(r"D:\Backup folder\Code\GitHub\goesafe101\AI\data\topo.csv")
river_df = pd.read_csv(r"D:\Backup folder\Code\GitHub\goesafe101\AI\data\river.csv")
nino_df = pd.read_csv(r"D:\Backup folder\Code\GitHub\goesafe101\AI\data\nino2025.csv", parse_dates=["date"])
result = predict_flood_risk(
    lat=-15.787,
    lon=35.005,
    area="Limbe",
    api_key=API_KEY,
    stage1_model=stage1_model,
    stage2_model=stage2_model,
    topo_df=topo_df,
    river_df=river_df,
    nino_df=nino_df
)
print(result)
