import React, { useState } from "react";
import Header from "./components/Header";
import ReportFeed from "./pages/ReportFeed";
import NewReport from "./pages/NewReport";
import "./App.css";

export default function App() {
  const [page, setPage] = useState("feed"); // "feed" | "new"
  const [refreshKey, setRefreshKey] = useState(0);

  const goToFeed = () => {
    setRefreshKey((k) => k + 1);
    setPage("feed");
  };

  return (
    <div className="app">
      <Header page={page} setPage={setPage} />
      <main className="main">
        {page === "feed" ? (
          <ReportFeed key={refreshKey} />
        ) : (
          <NewReport onSuccess={goToFeed} />
        )}
      </main>
      <footer className="footer">
        <span>CIVICREPORT — BUILT FOR THE PEOPLE</span>
      </footer>
    </div>
  );
}
