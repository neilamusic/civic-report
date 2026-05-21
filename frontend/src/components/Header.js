import React from "react";
import "./Header.css";

export default function Header({ page, setPage }) {
  return (
    <header className="header">
      <div className="header-logo" onClick={() => setPage("feed")}>
        <span className="logo-icon">⚠</span>
        <span className="logo-text">CIVIC<span className="logo-accent">REPORT</span></span>
      </div>
      <nav className="header-nav">
        <button
          className={`nav-btn ${page === "feed" ? "active" : ""}`}
          onClick={() => setPage("feed")}
        >
          All Reports
        </button>
        <button
          className={`nav-btn nav-btn--primary ${page === "new" ? "active" : ""}`}
          onClick={() => setPage("new")}
        >
          + File Report
        </button>
      </nav>
    </header>
  );
}
