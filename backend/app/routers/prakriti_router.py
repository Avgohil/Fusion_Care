from fastapi import APIRouter, HTTPException
import pandas as pd
from app.schemas.prakriti_schema import PrakritiInput
import joblib
import os

# Load model and encoder
model = joblib.load(os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), 'model', 'prakriti_model_robust.pkl'))
encoder = joblib.load(os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), 'model', 'prakriti_encoder.pkl'))

router = APIRouter(prefix="/prakriti", tags=["Prakriti Analysis"])

# Label mapping from your prototype
label_map = {0: 'Kapha', 1: 'Pitta', 2: 'Vata'}

# Recommendation bank from your prototype
recommendation_bank = {
    "Vata": {
        "Diet": "Eat warm, moist, and grounding foods like soups, cooked grains, and ghee.",
        "Yoga": "Slow, grounding yoga like Hatha or Yin. Avoid overstimulation.",
        "Sleep": "Stick to a fixed schedule, warm oil massage before bed.",
        "Stress": "Meditation, calming music, warm baths, and journaling."
    },
    "Pitta": {
        "Diet": "Eat cooling foods like cucumbers, coconut, dairy. Avoid spicy/oily items.",
        "Yoga": "Calming yoga like Moon Salutation and restorative poses.",
        "Sleep": "Sleep in a cool, dark room. Avoid late-night stimulation.",
        "Stress": "Practice pranayama (Sheetali), nature walks, and reduce competition."
    },
    "Kapha": {
        "Diet": "Favor light, dry, and spicy foods. Avoid heavy, oily meals.",
        "Yoga": "Dynamic, energizing yoga like Vinyasa or Power Yoga.",
        "Sleep": "Wake early. Avoid excessive napping or oversleeping.",
        "Stress": "Stimulate with new routines, breathwork, and active hobbies."
    }
}

@router.post("/predict")
def predict_prakriti(input_data: PrakritiInput):
    try:
        user_df = pd.DataFrame([input_data.dict()])
        
        # Use the model loader to get the encoder and model


        user_encoded = encoder.transform(user_df)
        user_encoded_df = pd.DataFrame(user_encoded, columns=encoder.get_feature_names_out())

        # Prediction
        probs = model.predict_proba(user_encoded_df)[0]
        prakriti_score = {label_map[i]: int(prob * 100) for i, prob in enumerate(probs)}

        # Dosha logic to determine verdict and recommendations
        sorted_doshas = sorted(prakriti_score.items(), key=lambda x: x[1], reverse=True)
        top1, top2 = sorted_doshas[0], sorted_doshas[1]
        diff = top1[1] - top2[1]

        if top1[1] >= 60 and diff >= 20:
            verdict = f"Dominant Prakriti: {top1[0]}"
            recommendations = recommendation_bank[top1[0]]
        else:
            verdict = f"Mix Prakriti: {top1[0]} - {top2[0]}"
            # Combine recommendations for mixed types
            recommendations = {
                "Diet": f"Primary: {recommendation_bank[top1[0]]['Diet']} Secondary: {recommendation_bank[top2[0]]['Diet']}",
                "Yoga": f"Primary: {recommendation_bank[top1[0]]['Yoga']} Secondary: {recommendation_bank[top2[0]]['Yoga']}",
                "Sleep": f"Primary: {recommendation_bank[top1[0]]['Sleep']} Secondary: {recommendation_bank[top2[0]]['Sleep']}",
                "Stress": f"Primary: {recommendation_bank[top1[0]]['Stress']} Secondary: {recommendation_bank[top2[0]]['Stress']}"
            }

        return {
            "Prakriti_Score": prakriti_score,
            "Verdict": verdict,
            "Recommendations": recommendations
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred during prediction: {str(e)}")