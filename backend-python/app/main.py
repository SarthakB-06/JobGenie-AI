import os
from dotenv import load_dotenv

# 1. LOAD ENV FIRST (Before importing app services)
base_dir = os.path.dirname(os.path.abspath(__file__))
env_path = os.path.join(base_dir, '.env')
load_dotenv(env_path)


if os.getenv("GOOGLE_API_KEY"):
    print(" GOOGLE_API_KEY loaded successfully.")
else:
    print("CRITICAL: GOOGLE_API_KEY is missing. Check .env file.")
from fastapi import FastAPI,UploadFile,File,HTTPException,Form
from typing import List
import json
from app.services.pdf_extractor import extract_text_from_pdf
from app.services.market_analyzer import MarketAnalyzer
from app.services.ats_scorer import ATSScorer
from app.services.llm_analyzer import analyze_resume_with_llm
import uvicorn
load_dotenv()


base_dir = os.path.dirname(os.path.abspath(__file__))
env_path = os.path.join(base_dir, '.env')
load_dotenv(env_path)

app = FastAPI()
market_analyzer = MarketAnalyzer()
ats_scorer = ATSScorer()

@app.get("/")
def read_root():
    return {"message" : "JobGenie Python AI service is running"}

@app.post("/analyze")
async def analyze_resume(file:UploadFile = File(...),job_description: str=Form(...)):
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")
    
    content = await file.read()
    
    # extract text
    resume_text = extract_text_from_pdf(content)
    if not resume_text:
        raise HTTPException(status_code=500, detail="Failed to extract text from PDF.")

    golden_standard = market_analyzer.generate_golden_standard([job_description])
    score_data = ats_scorer.score_resume(resume_text, golden_standard)

    # llm_feedback = analyze_resume_with_llm(resume_text, score_data['found_skills'])
    llm_feedback = analyze_resume_with_llm(
        resume_text=resume_text, 
        missing_skills=score_data['missing_skills'], 
        golden_standard_text=golden_standard         
    )

  
    
    return {
        "filename": file.filename,
        "ats_score": score_data['total_score'],
        "score_breakdown": score_data['breakdown'],
        "key_skills": score_data['found_skills'],
        "missing_skills": score_data['missing_skills'],
        "market_benchmark_summary": golden_standard[:200] + "...", 
        "summary": llm_feedback.get("summary"),
        "feedback": llm_feedback.get("weaknesses", []) + [llm_feedback.get("suggestion")]
    }



if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

