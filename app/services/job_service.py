from sqlalchemy.orm import Session
from fastapi import HTTPException

from app.models.job import Job
from app.schemas.job import JobCreate, JobUpdate
from app.workers.tasks import dispatch_jobs

def create_job(db: Session, job: JobCreate):

    new_job = Job(
        job_type=job.job_type,
        payload=job.payload,
        priority=job.priority,
        status="Pending"
    )

    db.add(new_job)
    db.commit()
    db.refresh(new_job)

    # Queue will be started manually
    return new_job


def get_all_jobs(
    db: Session,
    status: str = None,
    limit: int = 10,
    offset: int = 0
):

    query = db.query(Job)

    if status:
        query = query.filter(Job.status == status)

    jobs = query.offset(offset).limit(limit).all()

    for job in jobs:

        if job.started_at and job.completed_at:

            job.processing_time = (
                job.completed_at -
                job.started_at
            ).total_seconds()

        else:

            job.processing_time = None

    return jobs


def get_job_by_id(
    db: Session,
    job_id: int
):

    job = db.query(Job).filter(
        Job.id == job_id
    ).first()

    if not job:

        raise HTTPException(
            status_code=404,
            detail="Job not found"
        )

    if job.started_at and job.completed_at:

        job.processing_time = (
            job.completed_at -
            job.started_at
        ).total_seconds()

    else:

        job.processing_time = None

    return job


def delete_job(
    db: Session,
    job_id: int
):

    job = db.query(Job).filter(
        Job.id == job_id
    ).first()

    if not job:

        raise HTTPException(
            status_code=404,
            detail="Job not found"
        )

    db.delete(job)
    db.commit()

    return {
        "message": "Job deleted successfully"
    }


def update_job(
    db: Session,
    job_id: int,
    updated_job: JobUpdate
):

    job = db.query(Job).filter(
        Job.id == job_id
    ).first()

    if not job:

        raise HTTPException(
            status_code=404,
            detail="Job not found"
        )

    if updated_job.job_type is not None:
        job.job_type = updated_job.job_type

    if updated_job.payload is not None:
        job.payload = updated_job.payload

    if updated_job.priority is not None:
        job.priority = updated_job.priority

    db.commit()
    db.refresh(job)

    return job


def get_dashboard_stats(db: Session):

    total = db.query(Job).count()

    pending = db.query(Job).filter(
        Job.status == "Pending"
    ).count()

    running = db.query(Job).filter(
        Job.status == "Running"
    ).count()

    completed = db.query(Job).filter(
        Job.status == "Completed"
    ).count()

    failed = db.query(Job).filter(
        Job.status == "Failed"
    ).count()

    avg_processing_time = 0

    completed_jobs = db.query(Job).filter(
        Job.started_at.isnot(None),
        Job.completed_at.isnot(None)
    ).all()

    if completed_jobs:

        total_time = 0

        for job in completed_jobs:

            total_time += (
                job.completed_at -
                job.started_at
            ).total_seconds()

        avg_processing_time = round(
            total_time / len(completed_jobs),
            2
        )

    return {

        "total_jobs": total,
        "pending": pending,
        "running": running,
        "completed": completed,
        "failed": failed,
        "average_processing_time": avg_processing_time

    }


def get_queue_statistics(db: Session):

    pending_jobs = (
        db.query(Job)
        .filter(Job.status == "Pending")
        .all()
    )

    queue_length = len(pending_jobs)

    if queue_length == 0:

        return {
            "queue_length": 0,
            "highest_priority": "-",
            "lowest_priority": "-",
            "average_priority": 0,
            "oldest_job": "-",
            "newest_job": "-"
        }

    priorities = [job.priority for job in pending_jobs]

    highest_priority = max(priorities)

    lowest_priority = min(priorities)

    average_priority = round(
        sum(priorities) / queue_length,
        2
    )

    oldest_job = min(
        pending_jobs,
        key=lambda x: x.created_at
    )

    newest_job = max(
        pending_jobs,
        key=lambda x: x.created_at
    )

    return {

        "queue_length": queue_length,

        "highest_priority": highest_priority,

        "lowest_priority": lowest_priority,

        "average_priority": average_priority,

        "oldest_job": oldest_job.id,

        "newest_job": newest_job.id

    }