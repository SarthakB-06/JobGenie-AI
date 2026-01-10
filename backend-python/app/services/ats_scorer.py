import spacy
import json
import os
import numpy as np
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity


try:
    nlp = spacy.load("en_core_web_sm")
except OSError:
    print("Downloading Spacy model...")
    from spacy.cli import download
    download("en_core_web_sm")
    nlp = spacy.load("en_core_web_sm")


model = SentenceTransformer('all-MiniLM-L6-v2')

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SKILLS_DB_PATH= os.path.join(BASE_DIR, 'data' , 'skills_db.json')

ALL_SKILLS = set()

if os.path.exists(SKILLS_DB_PATH):
    with open(SKILLS_DB_PATH, 'r') as f:
        data = json.load(f)
        for category in data.values():
            for skill in category:
                ALL_SKILLS.add(skill.lower())
else:
    print("warning: Skills DB not found, using default fallback skills.")
    ALL_SKILLS = {"python", "javascript", "react", "node.js", "aws", "docker", "sql", "typescript", "java", "c++", "fastapi"}


class ATSScorer:
    def __init__(self):
        self.nlp = nlp
        self.model = model
        self.all_skills = ALL_SKILLS

    def extract_skills(self, text: str) -> list[str]:
        """
        Docstring for extract_skills
        
        :param self: Description
        :param text: Description
        :type text: str
        :return: Description
        :rtype: list[str]
        Deterministic Rule-Based Extraction using Spacy & String Matching.
        It checks tokens and noun chunks against our Skills Database.
        """
        doc = self.nlp(text.lower())
        found_skills = set()

        for token in doc:
            if token.text in self.all_skills:
                found_skills.add(token.text)
        
        for chunk in doc.noun_chunks:
            if chunk.text in self.all_skills:
                found_skills.add(chunk.text)
        return list(found_skills)


    def calculate_match(self, resume_text: str, golden_standard_text: str):
        """
        Compare Resume vs The RAG-Generated Golden Standard
        """
        # We use a dedicated SBERT model for similarity as it's better than Gemini's generic embeddings for this specific math
        resume_vec = self.model.encode([resume_text])
        standard_vec = self.model.encode([golden_standard_text])
        
        similarity = cosine_similarity(resume_vec, standard_vec)[0][0]
        return round(similarity * 100, 2)

    def score_resume(self, resume_text: str, golden_standard_text: str):
        # 1. Extract Hard Skills (Spacy)
        found_skills = self.extract_skills(resume_text)
        
    
        expected_skills = self.extract_skills(golden_standard_text)
        missing_skills = list(set(expected_skills) - set(found_skills))

        # 3. Calculate Vector Match
        vector_score = self.calculate_match(resume_text, golden_standard_text)
        
        # 4. Keyword Coverage Score
        # If the Golden Standard has 10 skills and you have 5 of them -> 50%
        if len(expected_skills) > 0:
            keyword_score = (len(set(found_skills).intersection(expected_skills)) / len(expected_skills)) * 100
            keyword_score = min(keyword_score, 100)
        else:
            keyword_score = vector_score # Fallback

        # Final Weighted Score
        # Vector (Context) = 60%, Keywords (Exact) = 40%
        final_score = (vector_score * 0.6) + (keyword_score * 0.4)

        return {
            "total_score": int(final_score),
            "breakdown": {
                "semantic_match": int(vector_score),
                "keyword_coverage": int(keyword_score)
            },
            "found_skills": found_skills,
            "missing_skills": missing_skills[:5] # Top 5 missing
        }