from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func

from app.db.database import Base


class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)

    job_type = Column(String, nullable=False)

    payload = Column(String, nullable=False)

    priority = Column(Integer, nullable=False)

    status = Column(String, default="Pending")

    retry_count = Column(Integer, default=0)

    error_message = Column(String, nullable=True)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )

    started_at = Column(DateTime(timezone=True), nullable=True)

    completed_at = Column(DateTime(timezone=True), nullable=True)