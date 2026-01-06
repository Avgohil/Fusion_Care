from fastapi import FastAPI
from pydantic import BaseModel
from typing import Literal

app = FastAPI()

# -----------------------------
# Define Input Schema
# -----------------------------
class PatientInput(BaseModel):
    prakriti_type: Literal["Vata", "Pitta", "Kapha"]
    age: int
    gender: Literal["Male", "Female"]
    diet_type: str
    sleep_quality: str
    stress_level: str
    physical_activity: str
    memory_loss: str
    confusion: str
    language_difficulty: str
    decision_making: str
    repetition_behavior: str
    social_withdrawal: str
    mood_swings: str
    chronic_conditions: str
    systolic_bp: int
    blood_sugar: int
    bmi: float
    family_history: Literal["Yes", "No"]

# -----------------------------
# Risk Logic Functions
# -----------------------------
def calculate_risk_score(row):
    score = 0
    if row['age'] > 65: score += 10
    if row['memory_loss'] == 'Mild': score += 15
    elif row['memory_loss'] == 'Severe': score += 20
    if row['confusion'] == 'Sometimes': score += 10
    elif row['confusion'] == 'Often': score += 15
    if row['language_difficulty'] == 'Mild': score += 5
    elif row['language_difficulty'] == 'Yes': score += 10
    if row['decision_making'] == 'Indecisive': score += 5
    elif row['decision_making'] == 'Poor': score += 10
    if row['repetition_behavior'] == 'Sometimes': score += 5
    elif row['repetition_behavior'] == 'Yes': score += 8
    if row['social_withdrawal'] == 'Sometimes': score += 5
    elif row['social_withdrawal'] == 'Yes': score += 7
    if row['mood_swings'] == 'Sometimes': score += 3
    elif row['mood_swings'] == 'Yes': score += 5
    if row['stress_level'] == 'Medium': score += 5
    elif row['stress_level'] == 'High': score += 8
    if row['sleep_quality'] == 'Poor': score += 7
    if row['physical_activity'] == 'Sedentary': score += 5
    if row['diet_type'] == 'Junk': score += 5
    if row['chronic_conditions'] in ['Diabetes', 'BP']: score += 10
    elif row['chronic_conditions'] == 'Both': score += 10
    if row['family_history'] == 'Yes': score += 10
    if row['systolic_bp'] > 140: score += 5
    if row['blood_sugar'] > 130: score += 5
    if row['bmi'] < 18 or row['bmi'] > 30: score += 5
    if row['prakriti_type'] == 'Vata': score *= 1.1
    elif row['prakriti_type'] == 'Kapha': score *= 1.05
    score = min(score, 125)
    return round((score / 125) * 100, 2)

def get_risk_level(score):
    if score <= 40:
        return "Low"
    elif 41 <= score <= 60:
        return "Medium"
    else:
        return "High"

def get_verdict(score):
    if score <= 40:
        return "Healthy but monitor"
    elif 41 <= score <= 60:
        return "Needs attention"
    else:
        return "High risk, take action"

AYURVEDA_REC = {
    'Vata': 'Brahmi, Ashwagandha, Abhyanga massage, warm diet',
    'Pitta': 'Shankhpushpi, Gotu Kola, cooling herbs, meditation',
    'Kapha': 'Triphala, Guggulu, Panchakarma, light diet'
}

ALLOPATHY_REC = {
    'Low': 'Annual wellness exam, cognitive screening',
    'Medium': 'Memory clinic referral, neurology consultation',
    'High': 'MRI brain scan, neuropsychological testing, therapy'
}

def get_recommendations(prakriti, risk_level):
    return AYURVEDA_REC[prakriti], ALLOPATHY_REC[risk_level]

# -----------------------------
# FastAPI Route
# -----------------------------
@app.post("/predict_risk")
def predict_risk(input: PatientInput):
    input_dict = input.dict()
    score = calculate_risk_score(input_dict)
    level = get_risk_level(score)
    verdict = get_verdict(score)
    ayurveda, allopathy = get_recommendations(input_dict['prakriti_type'], level)

    return {
        "Risk Score (out of 100)": score,
        "Risk Level": level,
        "Verdict": verdict,
        "Ayurveda Recommendations": ayurveda,
        "Allopathy Recommendations": allopathy
    }
