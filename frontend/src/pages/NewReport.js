import React, { useState } from "react";
import axios from "axios";
import "./NewReport.css";

const API = process.env.REACT_APP_API_URL || "";

const CATEGORIES = [
  { value: "pothole", label: "🕳️  Pothole / Road Damage" },
  { value: "lighting", label: "💡  Street Lighting" },
  { value: "graffiti", label: "🎨  Graffiti / Vandalism" },
  { value: "trash", label: "🗑️  Illegal Dumping / Trash" },
  { value: "sidewalk", label: "🚶  Sidewalk / Accessibility" },
  { value: "flooding", label: "🌊  Flooding / Drainage" },
  { value: "other", label: "📌  Other" },
];

const EMPTY = { title: "", description: "", category: "", location: "" };

export default function NewReport({ onSuccess }) {
  const [form, setForm] = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!form.title || !form.description || !form.category || !form.location) {
      setError("Please fill in all fields.");
      return;
    }

    setSubmitting(true);
    try {
      await axios.post(`${API}/api/reports`, form);
      onSuccess();
    } catch (err) {
      setError(
        err.response?.data?.error || "Submission failed. Is the backend running?"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="new-report">
      <div className="form-header">
        <h1 className="form-title">File a Report</h1>
        <p className="form-subtitle">
          Help your community by reporting local infrastructure issues.
        </p>
      </div>

      <form className="report-form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Issue Title</label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="e.g. Large pothole on 5th Ave"
            value={form.title}
            onChange={handleChange}
            maxLength={100}
          />
        </div>

        <div className="field">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            <option value="">Select a category...</option>
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="location">Location</label>
          <input
            id="location"
            name="location"
            type="text"
            placeholder="e.g. Corner of Main St and Broadway"
            value={form.location}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows={5}
            placeholder="Describe the issue in detail. When did you notice it? How severe is it?"
            value={form.description}
            onChange={handleChange}
            maxLength={1000}
          />
          <span className="char-count">{form.description.length}/1000</span>
        </div>

        {error && <p className="form-error">{error}</p>}

        <div className="form-actions">
          <button type="submit" className="submit-btn" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit Report →"}
          </button>
        </div>
      </form>
    </div>
  );
}
