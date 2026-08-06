import time
from datetime import datetime

from sqlalchemy.orm import Session

from app.db.database import SessionLocal
from app.models.job import Job
from app.workers.celery_app import celery
from app.core.logger import logger
from app.services.queue_manager import get_next_job


@celery.task
def dispatch_jobs():

    db: Session = SessionLocal()

    try:

        job = get_next_job(db)

        if job:

            logger.info(
                f"Dispatching Job {job.id} "
                f"(Priority {job.priority})"
            )

            process_job.delay(job.id)

        else:

            logger.info("No Pending Jobs")

    finally:

        db.close()


@celery.task
def process_job(job_id: int):

    db: Session = SessionLocal()

    try:

        job = db.query(Job).filter(Job.id == job_id).first()

        if not job:

            logger.error(f"Job {job_id} not found")
            return

        retries = 3

        for attempt in range(1, retries + 1):

            try:

                # Job Started
                job.status = "Running"
                job.started_at = datetime.utcnow()
                db.commit()

                logger.info(
                    f"Processing Job {job.id} "
                    f"(Attempt {attempt}/{retries})"
                )

                # Simulate Failure
                if job.payload == "FAIL":
                    raise Exception("Simulated failure")

                # Simulate Long Running Job
                time.sleep(10)

                # Job Completed
                job.status = "Completed"
                job.completed_at = datetime.utcnow()

                db.commit()

                logger.info(
                    f"Job {job.id} completed successfully"
                )

                # Process next pending job
                dispatch_jobs.delay()

                return

            except Exception as e:

                logger.error(str(e))

                if attempt < retries:

                    logger.warning(
                        f"Retrying Job {job.id} "
                        f"(Attempt {attempt}/{retries})"
                    )

                    time.sleep(5)

                else:

                    job.status = "Failed"
                    job.completed_at = datetime.utcnow()
                    job.retry_count = retries
                    job.error_message = str(e)

                    db.commit()

                    logger.error(
                        f"Job {job.id} permanently failed."
                    )

                    # Continue processing remaining jobs
                    dispatch_jobs.delay()

    finally:

        db.close()

        for handler in logger.handlers:
            handler.flush()