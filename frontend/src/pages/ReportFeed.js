import React, { useEffect, useState } from "react";
import axios from "axios";
import ReportCard from "../components/ReportCard";
import "./ReportFeed.css";

const API = process.env.REACT_APP_API_URL || "";

export default function ReportFeed() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all"); // all | open | in_progress | resolved

  const fetchReports = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${API}/api/reports`);
      setReports(res.data);
    } catch (err) {
      setError("Could not load reports. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const filtered =
    filter === "all" ? reports : reports.filter((r) => r.status === filter);

  const counts = {
    all: reports.length,
    open: reports.filter((r) => r.status === "open").length,
    in_progress: reports.filter((r) => r.status === "in_progress").length,
    resolved: reports.filter((r) => r.status === "resolved").length,
  };

  return (
    <div className="feed">
      <div className="feed-header">
        <h1 className="feed-title">Community Reports</h1>
        <p className="feed-subtitle">
          {counts.all} total · {counts.open} open · {counts.resolved} resolved
        </p>
      </div>

      <div className="filter-bar">
        {["all", "open", "in_progress", "resolved"].map((f) => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? "active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f === "in_progress" ? "In Progress" : f.charAt(0).toUpperCase() + f.slice(1)}
            <span className="filter-count">{counts[f]}</span>
          </button>
        ))}
      </div>

      {loading && <p className="feed-msg">Loading reports...</p>}
      {error && <p className="feed-msg feed-msg--error">{error}</p>}

      {!loading && !error && filtered.length === 0 && (
        <p className="feed-msg">No reports found. Be the first to file one!</p>
      )}

      <div className="feed-grid">
        {filtered.map((report) => (
          <ReportCard
            key={report.id}
            report={report}
            onUpdate={fetchReports}
            onDelete={fetchReports}
          />
        ))}
      </div>
    </div>
  );
}
