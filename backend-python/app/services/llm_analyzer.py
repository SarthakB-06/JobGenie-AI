# from google import genai
import google.generativeai as genai
import os
import json
import re

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

def clean_json_response(text: str):
    try:
        text = re.sub(r'```json\s*', '', text)
        text = re.sub(r'```\s*', '', text)
        return json.loads(text.strip())
    except json.JSONDecodeError:
        return None

def analyze_resume_with_llm(resume_text: str, missing_skills: list[str], golden_standard_text: str):
    """
    Analyzes the resume AGAINST the Golden Standard to provide gap-closing advice.
    """
    model = genai.GenerativeModel('gemini-2.5-flash')

    # Truncate to save tokens, but keep enough context
    truncated_resume = resume_text[:3000]
    truncated_standard = golden_standard_text[:2000]

    prompt = f"""
    You are an expert Career Coach.
    
    TARGET (The "Golden Standard" Job Profile):
    "{truncated_standard}"
    
    CANDIDATE RESUME:
    "{truncated_resume}"
    
    MISSING SKILLS IDENTIFIED: {missing_skills}
    
    Your Task: Provide actionable feedback to help this candidate match the TARGET profile specifically.
    
    Output strictly in JSON format:
    {{
        "summary": "A 1-sentence summary of how well the candidate fits the target profile.",
        "strengths": ["List 2 things the candidate matches well against the target"],
        "weaknesses": ["List 2 critical gaps relative to the target"],
        "suggestion": "Specific advice on where to add the missing skills ({', '.join(missing_skills)}) in their experience section naturally."
    }}
    """

    try:
        response = model.generate_content(prompt)
        result = clean_json_response(response.text)
        return result or fallback_response()
    except Exception as e:
        print(f"LLM Error: {e}")
        return fallback_response()

def fallback_response():
    return {
        "summary": "Analysis service unavailable.",
        "strengths": [],
        "weaknesses": ["Could not generate feedback"],
        "suggestion": "Please ensure you have covered the missing skills listed."
    }