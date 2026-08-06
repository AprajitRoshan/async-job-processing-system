from celery import Celery

celery = Celery(
    "async_job_system",
    broker="redis://localhost:6379/0",
    backend="redis://localhost:6379/0",
    include=["app.workers.tasks"]
)

celery.conf.update(
    task_serializer="json",
    result_serializer="json",
    accept_content=["json"],
    timezone="Asia/Kolkata",
    enable_utc=False,
)