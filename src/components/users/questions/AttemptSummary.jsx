import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function AttemptSummary({ apiBase, topic, setErrors }) {
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!topic) return;

    const fetchSummary = async () => {
      try {
        // First get CSRF token
        await fetch(`${apiBase}/sanctum/csrf-cookie`, {
          credentials: "include",
        });

        const csrfToken = Cookies.get("XSRF-TOKEN");
        const authToken = localStorage.getItem("auth_token");

        const response = await fetch(
          `${apiBase}/api/answers/summary/${topic}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${authToken}`,
              "X-XSRF-TOKEN": decodeURIComponent(csrfToken),
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            credentials: "include",
            cache: "no-store",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setErrors({ general: data.message });
          return;
        }
        setSummary(data);
        setError(null);
      } catch (err) {
        setErrors({ general: err.message });
        setSummary(null);
      }
    };

    fetchSummary();

    setInterval(() => fetchSummary(), 2000);
  }, [apiBase, topic, setErrors]);

  if (error) {
    return (
      <div className="alert alert-danger mt-3">
        {error}
        {error.includes("Session expired") && (
          <button
            onClick={() => window.location.reload()}
            className="btn btn-link p-0 ml-2"
          >
            Refresh
          </button>
        )}
      </div>
    );
  }

  if (!summary) {
    return <div className="text-info mt-20">Loading summary...</div>;
  }

  return (
    <div className="alert alert-info mt-20">
      <strong>Attempt Summary:</strong>
      <p>
        Attempted: {summary.total}
        <br />
        Score: {summary.score} / {summary.total}
        <br />
        Date:{" "}
        {`${new Date(summary.created_at).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })} | ${new Date(summary.created_at)
          .toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })
          .toLowerCase()}`}
      </p>
    </div>
  );
}
