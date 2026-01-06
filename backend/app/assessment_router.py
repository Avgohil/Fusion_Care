from fastapi import APIRouter
from pydantic import BaseModel
import numpy as np
import joblib
import os

router = APIRouter()

# Define the base directory for models
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
MODEL_DIR = os.path.join(BASE_DIR, "Backend", "model")

# Load the Alzheimer's risk model
try:
    alzheimers_model_path = os.path.join(MODEL_DIR, "alzheimers_stage2_model.pkl")
    risk_model = joblib.load(alzheimers_model_path)
    print(f"Alzheimer's risk model loaded from: {alzheimers_model_path}")
except Exception as e:
    print(f"Error loading Alzheimer's risk model: {e}")
    risk_model = None # Handle case where model fails to load


### ---- Risk Input ----
class RiskInput(BaseModel):
    memory: int
    concentration: int
    language: int
    daily_activity: int
    prakriti_vata: int
    prakriti_pitta: int
    prakriti_kapha: int

@router.post("/predict")
def predict_risk(data: RiskInput):
    if risk_model is None:
        return {"error": "Alzheimer's risk model not loaded."}

    features = np.array([[
        data.memory,
        data.concentration,
        data.language,
        data.daily_activity,
        data.prakriti_vata,
        data.prakriti_pitta,
        data.prakriti_kapha
    ]])

    prediction = risk_model.predict(features)[0]  # E.g., 0 = Low, 1 = Medium, 2 = High

    risk_level = ["Low", "Medium", "High"][prediction]

    recos = {
        "Low": {
            "Diet": "Maintain a balanced diet rich in leafy greens.",
            "Cognitive Training": "Play memory games twice a week.",
            "Lifestyle": "Regular physical activity is enough."
        },
        "Medium": {
            "Diet": "Include turmeric, omega-3, and antioxidants.",
            "Cognitive Training": "Daily brain workouts + journaling.",
            "Lifestyle": "Avoid stress, sleep well, reduce screen time."
        },
        "High": {
            "Diet": "Consult dietician, anti-inflammatory food mandatory.",
            "Cognitive Training": "Intensive therapy + constant monitoring.",
            "Lifestyle": "Avoid cognitive overload, maintain calm."
        }
    }

    return {
        "risk_score": int(prediction),
        "risk_level": risk_level,
        "recommendations": recos[risk_level]
    }
