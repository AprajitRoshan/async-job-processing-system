import { useEffect, useState } from "react";
import api from "../services/api";
import JobTable from "../components/JobTable";
import StatCard from "../components/StatsCard";
import JobForm from "../components/JobForm";
import "../styles/dashboard.css";

function Dashboard() {

    const [jobs, setJobs] = useState([]);

    const [stats, setStats] = useState({
        total_jobs: 0,
        pending: 0,
        running: 0,
        completed: 0,
        failed: 0,
        average_processing_time: 0,
    });

    const [queueStats, setQueueStats] = useState({
        queue_length: 0,
        highest_priority: "-",
        lowest_priority: "-",
        average_priority: 0,
        oldest_job: "-",
        newest_job: "-"
    });

    const [editingJob, setEditingJob] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");

    const [statusFilter, setStatusFilter] = useState("All");

    const [currentPage, setCurrentPage] = useState(1);

    const jobsPerPage = 5;

    useEffect(() => {

        refreshDashboard();

        const interval = setInterval(() => {
            refreshDashboard();
        }, 5000);

        return () => clearInterval(interval);

    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, statusFilter]);

    const fetchJobs = async () => {
        try {
            const response = await api.get("/jobs/");
            setJobs(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchStats = async () => {
        try {
            const response = await api.get("/jobs/dashboard/stats");
            setStats(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchQueueStats = async () => {
        try {
            const response = await api.get("/jobs/queue/statistics");
            setQueueStats(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const refreshDashboard = () => {
        fetchJobs();
        fetchStats();
        fetchQueueStats();
    };

    const startQueue = async () => {

        try {

            await api.post("/jobs/start-queue");

            alert("Queue Started Successfully!");

            refreshDashboard();

        } catch (error) {

            console.error(error);

            alert("Failed to Start Queue");

        }
    };

    const deleteJob = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this job?"
        );

        if (!confirmDelete) return;

        try {

            await api.delete(`/jobs/${id}`);

            refreshDashboard();

        } catch (error) {

            console.error(error);

            alert("Failed to delete job");

        }
    };

    const editJob = (job) => {
        setEditingJob(job);
    };

    const filteredJobs = jobs.filter((job) => {

        const matchesSearch = job.job_type
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        const matchesStatus =
            statusFilter === "All" ||
            job.status === statusFilter;

        return matchesSearch && matchesStatus;

    });

    const indexOfLastJob = currentPage * jobsPerPage;

    const indexOfFirstJob = indexOfLastJob - jobsPerPage;

    const currentJobs = filteredJobs.slice(
        indexOfFirstJob,
        indexOfLastJob
    );

    const totalPages = Math.ceil(
        filteredJobs.length / jobsPerPage
    );

    return (

        <div className="dashboard-container">

            <div className="hero">

                <h1>
                    🚀 Async Job Processing Dashboard
                </h1>

                <p>
                    Manage, Monitor and Process Background Jobs Efficiently
                </p>

                <div className="tech-stack">

                    <span className="tech-badge">
                        FastAPI
                    </span>

                    <span className="tech-badge">
                        PostgreSQL
                    </span>

                    <span className="tech-badge">
                        Celery
                    </span>

                    <span className="tech-badge">
                        Redis
                    </span>

                    <span className="tech-badge">
                        React
                    </span>

                </div>


            </div>

            <div className="top-bar">
                <button
                    className="start-btn"
                    onClick={startQueue}
                >
                    ▶ Start Queue
                </button>
            </div>

            <JobForm
                onJobCreated={refreshDashboard}
                editingJob={editingJob}
            />

            <div className="stats-grid">

                <StatCard
                    title="Total Jobs"
                    value={stats.total_jobs}
                />

                <StatCard
                    title="Pending"
                    value={stats.pending}
                />

                <StatCard
                    title="Running"
                    value={stats.running}
                />

                <StatCard
                    title="Completed"
                    value={stats.completed}
                />

                <StatCard
                    title="Failed"
                    value={stats.failed}
                />

                <StatCard
                    title="Avg Time (sec)"
                    value={stats.average_processing_time}
                />

            </div>

            <div className="section-card">

                <h2 className="section-title">
                    📊 Queue Statistics
                </h2>

                <div className="queue-grid">

                    <StatCard
                        title="Queue Length"
                        value={queueStats.queue_length}
                    />

                    <StatCard
                        title="Highest Priority"
                        value={queueStats.highest_priority}
                    />

                    <StatCard
                        title="Lowest Priority"
                        value={queueStats.lowest_priority}
                    />

                    <StatCard
                        title="Average Priority"
                        value={queueStats.average_priority}
                    />

                    <StatCard
                        title="Oldest Pending"
                        value={queueStats.oldest_job}
                    />

                    <StatCard
                        title="Newest Pending"
                        value={queueStats.newest_job}
                    />

                </div>

            </div>

            <div className="filter-bar">

                <input
                    type="text"
                    placeholder="🔍 Search Job Type..."
                    value={searchTerm}
                    onChange={(e) =>
                        setSearchTerm(e.target.value)
                    }
                    className="search-box"
                />

                <select
                    value={statusFilter}
                    onChange={(e) =>
                        setStatusFilter(e.target.value)
                    }
                    className="status-filter"
                >
                    <option value="All">All</option>
                    <option value="Pending">Pending</option>
                    <option value="Running">Running</option>
                    <option value="Completed">Completed</option>
                    <option value="Failed">Failed</option>
                </select>

            </div>

            <JobTable
                jobs={currentJobs}
                onDelete={deleteJob}
                onEdit={editJob}
            />

            <div className="pagination">

                <button
                    onClick={() =>
                        setCurrentPage(currentPage - 1)
                    }
                    disabled={currentPage === 1}
                >
                    Previous
                </button>

                <span
                    style={{
                        fontWeight: "bold",
                    }}
                >
                    Page {currentPage} of {totalPages || 1}
                </span>

                <button
                    onClick={() =>
                        setCurrentPage(currentPage + 1)
                    }
                    disabled={
                        currentPage === totalPages ||
                        totalPages === 0
                    }
                >
                    Next
                </button>

            </div>

            <footer className="footer">

                <h3>
                    🚀 Async Job Processing System
                </h3>

                <p>
                    Developed with ❤️ by <strong>Aprajit Roshan</strong>
                </p>

                <div className="footer-tech">

                    <span>FastAPI</span>

                    <span>React</span>

                    <span>PostgreSQL</span>

                    <span>Celery</span>

                    <span>Redis</span>

                </div>

                <div className="footer-copy">
                    © 2026 Aprajit Roshan. All Rights Reserved.
                </div>

            </footer>

        </div>

    );
}

export default Dashboard;