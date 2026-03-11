import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getById, updateTask, deleteTask } from "../services/TaskApi.js";
import { useAuth } from "../context/AuthContext.jsx";
import "../css/taskDetails.css";

export default function TaskDetails() {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [task, setTask] = useState(location.state?.task || null);
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState(null);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        if (!task) {
            getById(id)
                .then(data => setTask(data))
                .catch(() => navigate("/tasks", { replace: true }));
        }
    }, [id]);

    useEffect(() => {
        if (task) {
            setForm({
                title: task.title,
                description: task.description || "",
                status: task.status,
                priority: task.priority || "MEDIUM"
            });
        }
    }, [task]);

    const handleDelete = async () => {
        if (!confirm("Delete this task? This cannot be undone.")) return;
        setDeleting(true);
        try {
            await deleteTask(id);
            navigate("/tasks", { replace: true });
        } catch {
            alert("Failed to delete task");
            setDeleting(false);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const updated = await updateTask(id, form);
            setTask(updated);
            setEditing(false);
        } catch {
            alert("Failed to update task");
        } finally {
            setSaving(false);
        }
    };

    if (!task || !form) {
        return (
            <div className="task-details-loading">
                <p>Loading...</p>
            </div>
        );
    }

    const isOwner = task.user?.id === user?.id;

    const statusClass = { TODO: "todo", IN_PROGRESS: "in-progress", DONE: "done" };
    const priorityClass = { LOW: "low", MEDIUM: "medium", HIGH: "high" };

    return (
        <div className="task-details-page">

            <button className="back-btn" onClick={() => navigate("/tasks")}>
                ← Back to Tasks
            </button>

            <div className="task-details-card">
                {editing && isOwner ? (
                    <form className="edit-form" onSubmit={handleSave}>
                        <h2>Edit Task</h2>

                        <div className="form-group">
                            <label>Title</label>
                            <input
                                type="text"
                                value={form.title}
                                onChange={e => setForm({ ...form, title: e.target.value })}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                value={form.description}
                                onChange={e => setForm({ ...form, description: e.target.value })}
                                rows={4}
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Status</label>
                                <select
                                    value={form.status}
                                    onChange={e => setForm({ ...form, status: e.target.value })}
                                >
                                    <option value="TODO">To Do</option>
                                    <option value="IN_PROGRESS">In Progress</option>
                                    <option value="DONE">Done</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Priority</label>
                                <select
                                    value={form.priority}
                                    onChange={e => setForm({ ...form, priority: e.target.value })}
                                >
                                    <option value="LOW">Low</option>
                                    <option value="MEDIUM">Medium</option>
                                    <option value="HIGH">High</option>
                                </select>
                            </div>
                        </div>

                        <div className="edit-actions">
                            <button type="submit" className="btn-save" disabled={saving}>
                                {saving ? "Saving..." : "Save Changes"}
                            </button>
                            <button type="button" className="btn-cancel" onClick={() => setEditing(false)}>
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <>
                        <div className="task-details-top">
                            <div className="task-badges">
                                <span className={`status-badge ${statusClass[task.status] || ""}`}>
                                    {task.status?.replace("_", " ")}
                                </span>
                                {task.priority && (
                                    <span className={`priority-badge ${priorityClass[task.priority] || ""}`}>
                                        {task.priority}
                                    </span>
                                )}
                            </div>
                            <div style={{ display: "flex", gap: "8px" }}>
                                {isOwner ? (
                                    <>
                                        <button className="btn-edit" onClick={() => setEditing(true)}>
                                            Edit
                                        </button>
                                        <button className="btn-delete" onClick={handleDelete} disabled={deleting}>
                                            {deleting ? "Deleting..." : "Delete"}
                                        </button>
                                    </>
                                ) : (
                                    <span style={{ fontSize: "0.82rem", color: "var(--gray-500)", fontStyle: "italic", alignSelf: "center" }}>
                                        View only
                                    </span>
                                )}
                            </div>
                        </div>

                        <h2 className="task-title">{task.title}</h2>

                        {task.description ? (
                            <p className="task-description">{task.description}</p>
                        ) : (
                            <p className="task-no-desc">No description provided.</p>
                        )}

                        {task.dueDate && (
                            <div className="task-meta">
                                <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                            </div>
                        )}
                    </>
                )}
            </div>

        </div>
    );
}
