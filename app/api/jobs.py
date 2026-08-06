from typing import Optional

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.db.database import get_db

from app.schemas.job import (
    JobCreate,
    JobResponse,
    JobUpdate,
)

from app.services.job_service import (
    create_job,
    get_all_jobs,
    get_job_by_id,
    delete_job,
    update_job,
    get_dashboard_stats,
    get_queue_statistics,
)

from app.workers.tasks import dispatch_jobs

router = APIRouter(
    prefix="/jobs",
    tags=["Jobs"]
)


@router.post("/", response_model=JobResponse)
def create_new_job(
    job: JobCreate,
    db: Session = Depends(get_db)
):
    return create_job(db, job)


@router.post("/start-queue")
def start_queue():
    dispatch_jobs.delay()

    return {
        "message": "Queue processing started"
    }


@router.get("/", response_model=list[JobResponse])
def get_jobs(
    status: Optional[str] = Query(None),
    limit: int = Query(10, ge=1),
    offset: int = Query(0, ge=0),
    db: Session = Depends(get_db)
):
    return get_all_jobs(
        db,
        status,
        limit,
        offset
    )


@router.get("/dashboard/stats")
def dashboard_stats(
    db: Session = Depends(get_db)
):
    return get_dashboard_stats(db)


@router.get("/queue/statistics")
def queue_statistics(
    db: Session = Depends(get_db)
):
    return get_queue_statistics(db)


@router.get("/{job_id}", response_model=JobResponse)
def get_job(
    job_id: int,
    db: Session = Depends(get_db)
):
    return get_job_by_id(
        db,
        job_id
    )


@router.put("/{job_id}", response_model=JobResponse)
def edit_job(
    job_id: int,
    job: JobUpdate,
    db: Session = Depends(get_db)
):
    return update_job(
        db,
        job_id,
        job
    )


@router.delete("/{job_id}")
def remove_job(
    job_id: int,
    db: Session = Depends(get_db)
):
    return delete_job(
        db,
        job_id
    )