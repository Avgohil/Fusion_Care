from fastapi import APIRouter, Depends, HTTPException
import json
from app.core.database import DatabaseManager
from app.core.security import get_current_user
from app.core import analysis # Import your analysis logic
from app.schemas.assessment_schema import AssessmentData # Make sure you have this schema

router = APIRouter(prefix="/assessment", tags=["Assessments"])
db_manager = DatabaseManager()

@router.post("/submit")
def submit_assessment(data: AssessmentData, current_user: dict = Depends(get_current_user)):
    user_id = current_user['id']
    assessment_data_dict = data.dict()
    
    # 1. Analyze data using your core logic
    cognitive_score = analysis.analyze_cognitive_assessment(assessment_data_dict)
    prakriti_analysis = analysis.analyze_prakriti_assessment(assessment_data_dict)
    risk_analysis = analysis.calculate_risk_score(cognitive_score, prakriti_analysis)
    
    # 2. Save assessment to DB
    db_assessment_data = {
        "user_id": user_id,
        "cognitive_score": cognitive_score,
        "prakriti_type": prakriti_analysis['type'],
        "prakriti_scores": json.dumps(prakriti_analysis['scores']),
        "risk_score": risk_analysis['score'],
        "risk_level": risk_analysis['level'],
        "assessment_data": json.dumps(assessment_data_dict)
    }
    assessment_id = db_manager.save_assessment(db_assessment_data) # Ensure your save_assessment is updated to accept these fields
    
    # 3. Generate and save recommendations
    recommendations = analysis.generate_recommendations(prakriti_analysis['type'], risk_analysis['level'])
    # ... (code to save recommendations to the DB using db_manager) ...

    return {
        "assessmentId": assessment_id,
        "results": {
            "cognitiveScore": cognitive_score,
            "prakritiAnalysis": prakriti_analysis,
            "riskAnalysis": risk_analysis,
            "recommendations": recommendations
        }
    }

# Add the get_assessment_results endpoint here as well...