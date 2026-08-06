import "../styles/jobtable.css";

function JobTable({ jobs, onDelete, onEdit }) {

    const getPriorityBadge = (priority) => {

        if (priority >= 4) {
            return (
                <span className="badge priority-high">
                    HIGH
                </span>
            );
        }

        if (priority === 3) {
            return (
                <span className="badge priority-medium">
                    MEDIUM
                </span>
            );
        }

        return (
            <span className="badge priority-low">
                LOW
            </span>
        );

    };

    const getStatusBadge = (status) => {

        switch (status) {

            case "Pending":
                return (
                    <span className="badge status-pending">
                        Pending
                    </span>
                );

            case "Running":
                return (
                    <span className="badge status-running">
                        Running
                    </span>
                );

            case "Completed":
                return (
                    <span className="badge status-completed">
                        Completed
                    </span>
                );

            case "Failed":
                return (
                    <span className="badge status-failed">
                        Failed
                    </span>
                );

            default:
                return status;
        }

    };

    return (

        <div className="table-container">

            <table className="job-table">

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Job Type</th>

                        <th>Payload</th>

                        <th>Priority</th>

                        <th>Status</th>

                        <th>Retries</th>

                        <th>Processing Time</th>

                        <th>Error</th>

                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {jobs.length === 0 ? (

                        <tr>

                            <td colSpan="9">
                                No Jobs Found
                            </td>

                        </tr>

                    ) : (

                        jobs.map((job) => (

                            <tr key={job.id}>

                                <td>{job.id}</td>

                                <td>{job.job_type}</td>

                                <td>{job.payload}</td>

                                <td>
                                    {getPriorityBadge(job.priority)}
                                </td>

                                <td>
                                    {getStatusBadge(job.status)}
                                </td>

                                <td>

                                    <span className="retry-badge">
                                        {job.retry_count}
                                    </span>

                                </td>

                                <td>

                                    {job.processing_time
                                        ? `${job.processing_time.toFixed(2)} sec`
                                        : "-"}

                                </td>

                                <td>

                                    {job.error_message ? (

                                        <span
                                            className="error-badge"
                                            title={job.error_message}
                                        >
                                            ⚠ Error
                                        </span>

                                    ) : (

                                        "-"

                                    )}

                                </td>

                                <td>

                                    <button
                                        className="edit-btn"
                                        onClick={() => onEdit(job)}
                                    >
                                        ✏ Edit
                                    </button>

                                    <button
                                        className="delete-btn"
                                        onClick={() => onDelete(job.id)}
                                    >
                                        🗑 Delete
                                    </button>

                                </td>

                            </tr>

                        ))

                    )}

                </tbody>

            </table>

        </div>

    );

}

export default JobTable;