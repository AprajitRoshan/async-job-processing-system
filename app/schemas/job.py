from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class JobCreate(BaseModel):
    job_type: str
    payload: str
    priority: int


class JobResponse(BaseModel):
    id: int
    job_type: str
    payload: str
    priority: int
    status: str

    retry_count: int
    error_message: Optional[str] = None

    started_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    processing_time: Optional[float] = None

    class Config:
        from_attributes = True


class JobUpdate(BaseModel):
    job_type: Optional[str] = None
    payload: Optional[str] = None
    priority: Optional[int] = None