from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.jobs import router as job_router

app = FastAPI(
    title="Async Job Processing System",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",

        # Netlify
        "https://async-job-processing-system.netlify.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(job_router)


@app.get("/")
def root():
    return {
        "message": "Async Job Processing System is Running 🚀"
    }