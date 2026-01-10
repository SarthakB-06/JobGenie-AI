import os
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_classic.chains.retrieval_qa.base import RetrievalQA
from langchain_core.prompts import PromptTemplate


GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

class MarketAnalyzer:
    def __init__(self):
        self.embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
        self.llm = ChatGoogleGenerativeAI(model="models/gemini-2.5-flash", api_key=GOOGLE_API_KEY,temperature=0.3)

    def generate_golden_standard(self, job_descriptions: list[str]) -> str:
            """
            Take a list of raw Job desceriptions, embeds them, and uses RAG to synthesize a 'Perfect Job Description Summary
            """

            if not job_descriptions:
                return "General Software Engineer with Standard skills."
            

            text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
            docs = text_splitter.create_documents(job_descriptions)


            vectorstore = Chroma.from_documents(documents=docs, embedding=self.embeddings)

            retriever = vectorstore.as_retriever(search_kwargs={"k" : 5})

            prompt_template = """
            You are an expert Headhunter.
            Based on the following job market data (context), create a single "Golden Standard" Job description.
            Identify the most in-demand skills, qualifications, and experience required for the role.


            Context: {context}

            Question: Summarize the mandatory requirements for these roles into a cohesive paragraph.
            Answer:
            """

            PROMPT = PromptTemplate(template=prompt_template, input_variables=["context", "question"])

            chain = RetrievalQA.from_chain_type(
                llm=self.llm,
                chain_type="stuff",
                retriever=retriever,
                chain_type_kwargs={"prompt": PROMPT}
            )

            result = chain.invoke("Summarize the mandatory requirements")

            vectorstore = None


            if isinstance(result, dict):
               return result.get('result', str(result))