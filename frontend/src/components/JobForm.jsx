import { useState, useEffect } from "react";
import api from "../services/api";
import "../styles/jobform.css";

function JobForm({ onJobCreated, editingJob }) {

    const [jobType, setJobType] = useState("");
    const [payload, setPayload] = useState("");
    const [priority, setPriority] = useState(3);

    useEffect(() => {

        if (editingJob) {

            setJobType(editingJob.job_type);
            setPayload(editingJob.payload);
            setPriority(editingJob.priority);

        }

    }, [editingJob]);

    const clearForm = () => {

        setJobType("");
        setPayload("");
        setPriority(3);

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (editingJob) {

                await api.put(`/jobs/${editingJob.id}`, {
                    job_type: jobType,
                    payload: payload,
                    priority: Number(priority),
                });

                alert("Job Updated Successfully!");

            } else {

                await api.post("/jobs/", {
                    job_type: jobType,
                    payload: payload,
                    priority: Number(priority),
                });

                alert("Job Created Successfully!");

            }

            clearForm();

            onJobCreated();

        } catch (error) {

            console.error(error);

            alert("Operation Failed");

        }

    };

    return (

        <div className="form-card">

            <h2 className="form-title">
                {editingJob ? "✏ Update Job" : "➕ Create New Job"}
            </h2>

            <form
                onSubmit={handleSubmit}
                className="job-form"
            >

                <div>

                    <label>Job Type</label>

                    <input
                        type="text"
                        placeholder="Enter Job Type"
                        value={jobType}
                        onChange={(e) =>
                            setJobType(e.target.value)
                        }
                        required
                    />

                </div>

                <div>

                    <label>Payload</label>

                    <input
                        type="text"
                        placeholder="Enter Payload"
                        value={payload}
                        onChange={(e) =>
                            setPayload(e.target.value)
                        }
                        required
                    />

                </div>

                <div>

                    <label>Priority</label>

                    <select
                        value={priority}
                        onChange={(e) =>
                            setPriority(Number(e.target.value))
                        }
                    >
                        <option value={5}>
                            🔴 High (5)
                        </option>

                        <option value={4}>
                            🟠 High (4)
                        </option>

                        <option value={3}>
                            🟡 Medium (3)
                        </option>

                        <option value={2}>
                            🟢 Low (2)
                        </option>

                        <option value={1}>
                            ⚪ Low (1)
                        </option>

                    </select>

                </div>

                <div>

                    <button
                        type="submit"
                        className={`submit-btn ${editingJob ? "update" : ""
                            }`}
                    >
                        {editingJob
                            ? "Update Job"
                            : "Create Job"}
                    </button>

                </div>

            </form>

        </div>

    );

}

export default JobForm;