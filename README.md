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
