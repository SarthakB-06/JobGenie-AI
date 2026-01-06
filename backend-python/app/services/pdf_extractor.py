from pdfminer.high_level import extract_text
import io

def extract_text_from_pdf(file_bytes:bytes) -> str:
    try:
        file_stream = io.BytesIO(file_bytes)
        text = extract_text(file_stream)
        return text.strip()
    except Exception as e:
        print(f"Error extracting text from PDF: {e}")
        return ""