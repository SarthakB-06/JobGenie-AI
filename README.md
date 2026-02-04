# 🧞 JobGenie AI – The AI-Powered Career Architect

> **Upload → Score → Improve → Succeed**  
> A 3-Tier Enterprise-Grade Microservices application that helps job seekers beat the ATS using Google Gemini, NLP, and RAG technology.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-blue)
![Node](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-green)
![Python](https://img.shields.io/badge/AI%20Engine-Python%20%2B%20FastAPI-yellow)
![Docker](https://img.shields.io/badge/DevOps-Docker-blue)
![Google Gemini](https://img.shields.io/badge/AI-Google%20Gemini-orange)

JobGenie AI simulates a real-world **Applicant Tracking System (ATS)**. It analyzes your resume against live job market data, scores it using NLP algorithms, and provides actionable, Headhunter-level feedback using Generative AI.

---

## 🏗️ Technical Architecture

This project implements a **Hybrid Microservices Architecture** ("Lazy Loading Pattern") to solve the problem of running heavy AI computations on free-tier infrastructure without hitting timeout limits (50s on Vercel/Render).

```mermaid
graph TD
    Client[React Frontend (Vercel)] -->|REST API| Gateway[Node.js Gateway (Render)]
    Gateway -->|Auth & User Data| DB[(MongoDB Atlas)]
    Gateway -->|Analysis Request| AI[Python AI Engine (Hugging Face)]
    
    subgraph "AI Microservice (Dockerized)"
        AI -->|Extract Text| PDF[PDFMiner]
        AI -->|Generate Embeddings| Vector[Google Gemini Embeddings]
        AI -->|RAG Analysis| LLM[Google Gemini 1.5 Flash]
    end
```

### Key Technical Challenges Solved
1.  **Cold Start latency**: Implemented "Lazy Loading" imports in Python to reduce startup time by 60%.
2.  **Memory Constraints**: Replaced heavy local Hugging Face transformers (grabbing 2GB+ RAM) with **Google Gemini API** for embeddings, allowing the AI engine to run on <512MB RAM.
3.  **Cross-Origin Communication**: Configured complex CORS policies between Vercel (Frontend), Render (Gateway), and Hugging Face (AI).

---

## ✨ Features

- **ATS Scoring Engine**: Breaks down your resume into formatting, keywords, and impact scores.
- **RAG-based Analysis**: Doesn't just hallucinate; uses Retrieval Augmented Generation to compare your resume against real job descriptions.
- **Microservices Deployment**: Disconnected frontend and backend scaling.
- **Modern Linear-Style UI**: A clean, bento-box design system built with Tailwind CSS.

---

## 🛠️ Tech Stack

| Layer | Technology | Hosting |
| :--- | :--- | :--- |
| **Frontend** | React, Vite, Tailwind CSS, Framer Motion | Vercel |
| **Gateway** | Node.js, Express, MongoDB, JWT | Render |
| **AI Engine** | Python, FastAPI, LangChain, Google Gemini | Hugging Face Spaces |
| **DevOps** | Docker, Git, Environmental Config | - |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- Python 3.10+
- Google Gemini API Key

### Installation

1.  **Clone the Repo**
    ```bash
    git clone https://github.com/yourusername/JobGenie-AI.git
    ```

2.  **Setup Backend (Node)**
    ```bash
    cd backend-node
    npm install
    # Create .env with MONGODB_URI and JWT_SECRET
    npm run dev
    ```

3.  **Setup AI Engine (Python)**
    ```bash
    cd backend-python
    python -m venv venv
    source venv/bin/activate # or venv\Scripts\activate
    pip install -r requirements.txt
    # Create .env with GOOGLE_API_KEY
    uvicorn app.main:app --reload
    ```

4.  **Setup Frontend**
    ```bash
    cd client
    npm install
    npm run dev
    ```

---

## 🔮 Future Roadmap

- [ ] Chrome Extension for 1-click LinkedIn Profile Analysis.
- [ ] Mock Interview AI Avatar.
- [ ] Automated Cover Letter Generation.

---

## 🤝 Authors & Credits

**Developer**: [Your Name]  
**Co-Architect & AI Pair Programmer**: **GitHub Copilot (Gemini 3 Pro)**

> *"This project was built with the assistance of GitHub Copilot using the Gemini 3 Pro model. Copilot served as a full-stack architect, helping with:"*
>
> *   **System Design**: Architecting the 3-tier microservice split to optimize for free-tier hosting limits.
>   **Debugging**: Diagnosing complex CORS and deployment timeout issues across Vercel and Render.
>   **Refactoring**: Implementing lazy-loading in Python to prevent server timeouts.
>   **Content Strategy**: Crafting the marketing copy and documentation.

---

*Built with ❤️ and ☕.*
