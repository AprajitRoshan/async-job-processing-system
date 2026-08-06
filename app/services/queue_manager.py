from sqlalchemy.orm import Session

from app.models.job import Job


def get_next_job(db: Session):

    job = (
        db.query(Job)
        .filter(Job.status == "Pending")
        .order_by(
            Job.priority.desc(),
            Job.created_at.asc()
        )
        .first()
    )

    return job