from fastapi import FastAPI,UploadFile,File,HTTPException
from app.services.pdf_extractor import extract_text_from_pdf

app = FastAPI()


@app.get("/")
def read_root():
    return {"message" : "JobGenie Python AI service is running"}

@app.post("/analyze")
async def analyze_resume(file:UploadFile = File(...)):
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")
    
    content = await file.read()
    
    # extract text
    text = extract_text_from_pdf(content)

    if not text:
        raise HTTPException(status_code=500, detail="Failed to extract text from PDF.")
    
    # TODO: AI scoring logic goes here
    dummy_score = min(len(text) // 10,100)

    return {
        "filename": file.filename,
        "extracted_text_length": len(text),
        "ats_score": dummy_score,
        "feedback":["Resume is readable" , "Good Length"]
    }



if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

