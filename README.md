# 🚀 Async Job Processing System

A full-stack **Asynchronous Job Processing System** built using **FastAPI, React, PostgreSQL, Celery, and Redis**.

The application enables users to submit background jobs, schedule them using **Priority Scheduling** with **FIFO (First-In, First-Out)** for jobs of the same priority, process them asynchronously through Celery workers, and monitor execution using a modern React dashboard.

---

## 📌 Project Overview

Modern applications often execute long-running tasks such as:

- Report generation
- File processing
- AI inference
- Email notifications
- Data synchronization
- Image processing

Executing these tasks synchronously blocks the server and degrades user experience.

This project demonstrates how to build a production-style asynchronous job processing system where:

- Jobs are persisted in PostgreSQL.
- A Queue Manager selects jobs using **Priority Scheduling + FIFO**.
- Celery workers process jobs asynchronously.
- Redis acts as the message broker.
- Users can monitor job execution through a React dashboard.

---

# ✨ Features

## Backend

- RESTful APIs using FastAPI
- PostgreSQL database
- SQLAlchemy ORM
- Alembic database migrations
- Celery background workers
- Redis message broker
- Queue Manager
- Priority Scheduling
- FIFO Scheduling
- Retry Mechanism
- Logging
- Processing Time Calculation
- Queue Statistics
- Dashboard Statistics
- CRUD Operations

---

## Frontend

- Modern React Dashboard
- Hero Section
- Job Creation
- Job Editing
- Job Deletion
- Search Jobs
- Filter Jobs
- Pagination
- Queue Statistics
- Dashboard Statistics
- Processing Time Display
- Retry Count
- Error Messages
- Priority Labels
- Status Badges
- Start Queue Button

---

# ⭐ Key Highlights

- Asynchronous Background Processing
- Database-backed Queue Management
- Priority Scheduling
- FIFO Scheduling
- Retry Mechanism
- Real-time Dashboard Refresh
- Modern Responsive UI
- Clean Backend Architecture
- Service Layer Design
- Professional Project Structure

---

# 🛠️ Tech Stack

## Backend

| Technology | Purpose |
|------------|---------|
| FastAPI | REST API Framework |
| PostgreSQL | Relational Database |
| SQLAlchemy | ORM for Database Operations |
| Alembic | Database Migrations |
| Celery | Asynchronous Task Queue |
| Redis | Message Broker |
| Pydantic | Data Validation |
| Uvicorn | ASGI Server |

---

## Frontend

| Technology | Purpose |
|------------|---------|
| React | Frontend Framework |
| Axios | API Communication |
| CSS | UI Styling |
| Vite | React Build Tool |

---

## Development Tools

| Tool | Purpose |
|------|---------|
| Git | Version Control |
| GitHub | Source Code Hosting |
| Swagger UI | API Testing |
| VS Code | Development Environment |

---

# 🏗️ System Architecture

```text
                        React Dashboard
                               │
                               ▼
                       FastAPI REST API
                               │
               ┌───────────────┴───────────────┐
               ▼                               ▼
         PostgreSQL                      Redis Broker
               │                               │
               └───────────────┬───────────────┘
                               ▼
                        Queue Manager
                  (Priority DESC + FIFO ASC)
                               │
                               ▼
                         Celery Worker
                               │
                               ▼
                   Background Job Processing
                               │
                               ▼
                     Dashboard Auto Refresh
```

---

### Architecture Overview

The application follows a layered architecture where:

- React provides the user interface.
- FastAPI exposes REST APIs.
- PostgreSQL stores all job information.
- Redis acts as the Celery message broker.
- The Queue Manager selects the next job using **Priority Scheduling** and **FIFO**.
- Celery Workers execute jobs asynchronously.
- The dashboard continuously displays updated job information.

---

# 📂 Project Structure

```text
async-job-processing-system/
│
├── alembic/
│
├── app/
│   ├── api/
│   ├── core/
│   ├── db/
│   ├── models/
│   ├── schemas/
│   ├── services/
│   ├── workers/
│   └── main.py
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   └── App.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── requirements.txt
├── alembic.ini
├── README.md
└── .gitignore
```

---

### Backend Modules

| Folder | Purpose |
|----------|----------|
| api | API Routes |
| core | Configuration & Logger |
| db | Database Configuration |
| models | SQLAlchemy Models |
| schemas | Pydantic Schemas |
| services | Business Logic |
| workers | Celery Tasks & Queue Manager |

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/AprajitRoshan/async-job-processing-system.git

cd async-job-processing-system
```

---

## Backend Setup

```bash
python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt
```

---

## Configure Environment

Create a `.env` file and configure:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/database_name

REDIS_URL=redis://localhost:6379/0
```

---

## Run FastAPI

```bash
uvicorn app.main:app --reload
```

---

## Start Redis

```bash
redis-server
```

---

## Start Celery Worker

```bash
celery -A app.workers.celery_app worker --pool=solo --loglevel=info
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

# 📡 API Endpoints

## Job Management APIs

| Method | Endpoint | Description |
|----------|--------------------------|-------------------------------|
| POST | `/jobs/` | Create a new Job |
| GET | `/jobs/` | Retrieve all Jobs |
| GET | `/jobs/{id}` | Retrieve Job by ID |
| PUT | `/jobs/{id}` | Update Job |
| DELETE | `/jobs/{id}` | Delete Job |

---

## Queue APIs

| Method | Endpoint | Description |
|----------|-------------------------------|----------------------------|
| POST | `/jobs/start-queue` | Start Queue Processing |
| GET | `/jobs/queue/statistics` | Queue Statistics |

---

## Dashboard APIs

| Method | Endpoint | Description |
|----------|--------------------------|--------------------------|
| GET | `/jobs/dashboard/stats` | Dashboard Statistics |

---

### API Documentation

FastAPI automatically generates interactive API documentation using Swagger UI.

```
http://localhost:8000/docs
```

```
http://localhost:8000/redoc
```

---

# 🔄 Job Processing Workflow

The complete job lifecycle is illustrated below.

```text
           User Creates Job
                  │
                  ▼
          Stored in PostgreSQL
           Status = Pending
                  │
                  ▼
         User Starts Queue
                  │
                  ▼
         Queue Manager Selects
      Highest Priority Pending Job
                  │
                  ▼
        Celery Worker Processes Job
                  │
          ┌───────┴────────┐
          ▼                ▼
     Completed         Failed
                              │
                              ▼
                     Retry Mechanism
                              │
                     Retry up to 3 Times
                              │
          ┌───────────────────┴──────────────────┐
          ▼                                      ▼
     Completed                               Permanently Failed
```

---

### Job Lifecycle

1. User submits a job.
2. Job is stored in PostgreSQL with **Pending** status.
3. User starts the queue.
4. Queue Manager selects the highest-priority pending job.
5. Celery worker starts processing.
6. Job status changes to **Running**.
7. On success:
   - Status becomes **Completed**.
   - Processing time is recorded.
8. On failure:
   - Retry mechanism attempts execution up to **3 times**.
   - If all retries fail:
     - Status becomes **Failed**
     - Error message is stored.

---

# 🚦 Priority Scheduling

Jobs are not processed immediately after creation.

Instead, every job is stored in PostgreSQL with **Pending** status.

The Queue Manager selects the next job using the following query:

```sql
SELECT *
FROM jobs
WHERE status='Pending'
ORDER BY priority DESC,
created_at ASC
LIMIT 1;
```

---

### Priority Levels

| Priority | Level |
|-----------|--------|
| 5 | Highest |
| 4 | High |
| 3 | Medium |
| 2 | Low |
| 1 | Lowest |

---

This ensures that:

- Higher priority jobs are always processed first.
- Lower priority jobs wait until higher priority jobs finish.

---

# 📋 FIFO Scheduling

If multiple jobs have the same priority, the Queue Manager processes them in the order they were created.

Example:

| Job | Priority | Created |
|------|----------|----------|
| Job A | 5 | 10:00 AM |
| Job B | 5 | 10:02 AM |
| Job C | 5 | 10:05 AM |

Execution Order:

```
Job A
↓

Job B
↓

Job C
```

This guarantees **First-In, First-Out (FIFO)** execution for jobs with equal priority.

---

# 🔁 Retry Mechanism

Background jobs may fail due to temporary issues.

To improve reliability, the worker automatically retries failed jobs.

### Retry Strategy

- Maximum Retries: **3**
- Delay Between Retries: **5 seconds**

Workflow:

```text
Job Started
     │
     ▼
Exception
     │
     ▼
Retry #1
     │
     ▼
Retry #2
     │
     ▼
Retry #3
     │
     ▼
Failed
```

---

### Failure Information

If all retries fail:

- Status becomes **Failed**
- Retry count is recorded
- Error message is stored in the database
- Dashboard displays failure details

---

# 📊 Dashboard Features

The React dashboard provides a centralized interface for monitoring and managing background jobs.

---

## Features

### 📋 Dashboard Statistics

Displays:

- Total Jobs
- Pending Jobs
- Running Jobs
- Completed Jobs
- Failed Jobs
- Average Processing Time

---

### 📦 Queue Statistics

Displays:

- Queue Length
- Highest Priority
- Lowest Priority
- Average Priority
- Oldest Pending Job
- Newest Pending Job

---

### 📝 Job Management

Users can:

- Create Job
- Update Job
- Delete Job
- View Job Details

---

### 🔍 Search & Filter

Users can:

- Search by Job Type
- Filter by Job Status
- Navigate using Pagination

---

### 📈 Job Table

Displays:

- Job ID
- Job Type
- Payload
- Priority
- Current Status
- Retry Count
- Processing Time
- Error Message
- Edit/Delete Actions

---

# 📸 Screenshots

## Dashboard
![Dashboard Running](images/dashboard.png)


---

## 🚀 Dashboard (Queue Running)

![Dashboard Running](images/dashboard-running.png)

---

## 📊 Dashboard (Completed)

![Dashboard Completed](images/dashboard-completed-page1.png)

---

## 📄 Dashboard (Page 2)

![Dashboard Page 2](images/dashboard-completed-page2.png)

---

## 📖 Swagger API Documentation

![Swagger UI](images/swagger-ui.png)

---

## ⚙️ Celery Worker Logs

![Celery Worker](images/celery-worker.png)

---

## 🗄️ PostgreSQL Database

![PostgreSQL](images/pgadmin.png)

# 🚀 Future Improvements

This project can be further enhanced with the following features:

- JWT Authentication
- Role-Based Access Control (RBAC)
- Docker Containerization
- Kubernetes Deployment
- RabbitMQ Integration
- Multiple Celery Workers
- Real-Time Dashboard using WebSockets
- Email Notifications
- File Upload Support
- Scheduled Jobs
- Job Cancellation
- Job Dependencies
- Prometheus & Grafana Monitoring
- Unit & Integration Testing
- CI/CD Pipeline with GitHub Actions

---

# 📚 Learning Outcomes

This project helped me gain practical experience with:

- Building REST APIs using FastAPI
- Database Design using PostgreSQL
- SQLAlchemy ORM
- Database Migrations using Alembic
- Background Task Processing using Celery
- Redis Message Broker
- Queue Management Algorithms
- Priority Scheduling
- FIFO Scheduling
- Retry Mechanism
- React Dashboard Development
- API Integration using Axios
- Git & GitHub Workflow
- Project Architecture
- Debugging and Problem Solving

---

# 👨‍💻 Author

**Aprajit Roshan**

B.Tech Graduate – Computer Science (Cloud Computing & Virtualization)

Passionate about Backend Development, Distributed Systems, Cloud Computing, and Full-Stack Web Development.

### Connect

- GitHub: https://github.com/AprajitRoshan
- LinkedIn: *(Add your LinkedIn profile URL here)*

---

# 📄 License

This project was developed as part of a backend training assignment and is intended for educational and portfolio purposes.

Feel free to fork and learn from this project.

---
