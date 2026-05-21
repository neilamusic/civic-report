import React, { useState } from "react";
import axios from "axios";
import "./ReportCard.css";

const API = process.env.REACT_APP_API_URL || "";

const CATEGORY_ICONS = {
  pothole: "🕳️",
  lighting: "💡",
  graffiti: "🎨",
  trash: "🗑️",
  sidewalk: "🚶",
  flooding: "🌊",
  other: "📌",
};

const STATUS_LABELS = {
  open: { label: "Open", color: "status--open" },
  in_progress: { label: "In Progress", color: "status--progress" },
  resolved: { label: "Resolved", color: "status--resolved" },
};

export default function ReportCard({ report, onUpdate, onDelete }) {
  const [loading, setLoading] = useState(false);

  const handleStatus = async (newStatus) => {
    setLoading(true);
    try {
      await axios.patch(`${API}/api/reports/${report.id}/status`, {
        status: newStatus,
      });
      onUpdate();
    } catch (err) {
      alert("Failed to update status.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this report?")) return;
    setLoading(true);
    try {
      await axios.delete(`${API}/api/reports/${report.id}`);
      onDelete();
    } catch (err) {
      alert("Failed to delete report.");
    } finally {
      setLoading(false);
    }
  };

  const s = STATUS_LABELS[report.status] || STATUS_LABELS.open;
  const icon = CATEGORY_ICONS[report.category] || "📌";
  const date = new Date(report.created_at).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric"
  });

  return (
    <article className="card">
      <div className="card-top">
        <span className="card-icon">{icon}</span>
        <div className="card-meta">
          <span className={`card-status ${s.color}`}>{s.label}</span>
          <span className="card-date">{date}</span>
        </div>
      </div>

      <h2 className="card-title">{report.title}</h2>
      <p className="card-location">📍 {report.location}</p>
      <p className="card-desc">{report.description}</p>

      <div className="card-actions">
        {report.status !== "in_progress" && report.status !== "resolved" && (
          <button className="btn btn--blue" disabled={loading} onClick={() => handleStatus("in_progress")}>
            Mark In Progress
          </button>
        )}
        {report.status !== "resolved" && (
          <button className="btn btn--green" disabled={loading} onClick={() => handleStatus("resolved")}>
            ✓ Resolved
          </button>
        )}
        <button className="btn btn--red" disabled={loading} onClick={handleDelete}>
          Delete
        </button>
      </div>
    </article>
  );
}
