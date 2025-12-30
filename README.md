# 💼 JobGenie AI – AI-Powered Resume Scoring & Job Match Platform

> Upload → Score → Improve → Unlock Jobs → Apply  
**A smart platform that helps job seekers get interviews faster.**

JobGenie AI analyzes your resume using AI, scores its ATS compatibility for your target role, suggests improvements, and — once optimized — unlocks curated job listings fetched from multiple platforms. Users manually refine their resume based on feedback, re-upload, and track their score until it meets the requirement for applying.

---

## 🚀 Core Features

### 🧠 Resume Analysis
- Upload PDF / DOCX resume
- FastAPI extracts text & sections using NLP
- Skill, experience & keyword detection

### 📊 ATS Scoring System
- Custom scoring engine based on:
  - Skill match %
  - Keyword overlap
  - Experience depth
  - Formatting quality
- Score improves with each re-upload
- Gamified improvement loop

### 💬 AI-Powered Suggestions
- LLM (Llama-3) provides:
  - Missing skills
  - Weak bullet point detection
  - Formatting issues
  - Personalized suggestions

### 🌐 Job Aggregation
- Search jobs by title, location, salary, tech stack
- Aggregates jobs from multiple platforms
- One-click redirection to apply
- Jobs only unlock when resume score >= threshold

---

## 🧱 Tech Stack

| Layer | Technology |
|--------|------------|
| Frontend | React, TailwindCSS, Framer Motion |
| Backend API | Node.js + Express |
| AI Engine | FastAPI + Python + spaCy + Llama-3 (Ollama / vLLM) |
| Database | MongoDB Atlas |
| Auth | JWT |
| File Upload | Cloudinary / AWS S3 |
| Deployment | Vercel (client) + Render / Railway (backend) |

---

## 🏗️ Architecture

Frontend (React)
|
Node.js API Gateway (auth, job fetch, calls AI)
|
FastAPI Microservice (resume parsing, scoring, LLM suggestions)
|
MongoDB (user data, resume versions, job search history)


---

## 📂 Folder Structure

/jobgenie-ai
├── client/ # React frontend
├── server/ # Node.js backend
├── ai/ # FastAPI AI microservice
├── README.md
└── docker-compose.yml

---

## 🧠 ATS Score Design

score =
skill_match * 0.5

keyword_overlap * 0.2

experience_depth * 0.2

formatting_quality * 0.1

**Threshold Example:**  
Resume must score ≥ 80 to unlock job listings.

---

## 🎯 Roadmap

### MVP – Phase 1
- [ ] Resume upload
- [ ] Extract + analyze text (FastAPI)
- [ ] Basic ATS scoring
- [ ] AI suggestions

### Phase 2
- [ ] Job aggregation service
- [ ] UI dashboard + auth
- [ ] Unlock logic
- [ ] Deploy MVP

### Phase 3 (Stretch Goals)
- [ ] Daily job email alerts
- [ ] Application tracker (Kanban)
- [ ] Semantic search (embeddings)
- [ ] Community resume leaderboard

---

## 🧪 Running the Project Locally (Plan)

```bash
# Clone repo
git clone https://github.com/yourname/jobgenie-ai
cd jobgenie-ai

# Frontend
cd client
npm install
npm run dev

# Backend
cd ../server
npm install
npm run dev

# AI Engine
cd ../ai
pip install -r requirements.txt
uvicorn main:app --reload
🧑‍💻 Author

Sarthak Bansal – Full-Stack & AI Developer
🎯 Focus: MERN + AI + FastAPI + Resume Automation
📫 Contact: sarthakbansal725@gmail.com