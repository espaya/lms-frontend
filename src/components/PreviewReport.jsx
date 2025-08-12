import { useParams } from "react-router-dom";
import MyHeader from "./MyHeader";
import Sidebar from "./Sidebar";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import ExportReport from "./admin/ExportReport";

export default function PreviewReport() {
  const reportRef = useRef(null);
  const { id } = useParams(); // Destructure id directly
  const [previewReport, setPreviewReport] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiBase = import.meta.env.VITE_API_URL;
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const getReports = async () => {
      setLoading(true);
      setErrors({});

      try {
        // First get CSRF token
        await fetch(`${apiBase}/sanctum/csrf-cookie`, {
          credentials: "include",
        });

        const csrfToken = Cookies.get("XSRF-TOKEN");
        const authToken = localStorage.getItem("auth_token");

        const response = await fetch(
          `${apiBase}/api/get-report-by-topic/${id}`,
          {
            credentials: "include",
            method: "GET",
            headers: {
              Authorization: `Bearer ${authToken}`,
              "X-XSRF-TOKEN": decodeURIComponent(csrfToken),
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json(); // Added await here

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch report");
        }

        // Handle both wrapped and direct responses
        setPreviewReport(data.data || data);
      } catch (err) {
        setErrors({ general: err.message || "An error occurred" });
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    getReports();
  }, [apiBase, id]); // Added id to dependencies

  // Process reports data
  const reports = Array.isArray(previewReport)
    ? previewReport
    : previewReport?.data
    ? Array.isArray(previewReport.data)
      ? previewReport.data
      : [previewReport.data]
    : [];

  return (
    <>
      <title>Preview Report - 1staccess Home Care</title>

      <div id="main-wrapper">
        <MyHeader />
        <Sidebar />
        <div className="content-body">
          <div className="container">
            <div className="page-title">
              <div className="row align-items-center justify-content-between">
                <div className="col-md-6">
                  <div className="page-title-content">
                    <h3>Report Preview</h3>
                    <p className="mb-2">Welcome to Edunet My Card page</p>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="breadcrumbs">
                    <a href="#">Home</a>
                    <span>
                      <i className="ri-arrow-right-s-line" />
                    </span>
                    <a href="#">Report Preview</a>
                  </div>

                  {reports.length > 0 && <ExportReport reportRef={reportRef} />}
                </div>
              </div>
            </div>

            {/* Error Message */}
            {errors.general && (
              <div className="alert alert-danger">Error: {errors.general}</div>
            )}

            {/* Loading Spinner */}
            {loading && (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}

            {/* Reports Table */}
            {!loading && (
              <div className="row">
                <div className="col-12">
                  <div className="card transparent">
                    <div id="report" className="card-body" ref={reportRef}>
                      <div className="rtable rtable--5cols rtable--collapse">
                        <div className="rtable-row rtable-row--head bg-transparent">
                          <div className="rtable-cell topic-cell column-heading text-dark">
                            <strong>Name</strong>
                          </div>
                          <div className="rtable-cell id-cell column-heading text-dark">
                            <strong>Topic</strong>
                          </div>
                          <div className="rtable-cell date-cell column-heading text-dark">
                            <strong>Grade</strong>
                          </div>
                          <div className="rtable-cell amount-cell column-heading text-dark">
                            <strong>Signature</strong>
                          </div>
                          <div className="rtable-cell card-cell column-heading text-dark">
                            <strong>Date</strong>
                          </div>
                        </div>

                        {reports.length === 0 ? (
                          <div className="rtable-row">
                            <div
                              className="rtable-cell"
                              style={{ gridColumn: "1/-1" }}
                            >
                              <div className="text-center py-4 text-muted">
                                {loading
                                  ? "Loading..."
                                  : "No report data available"}
                              </div>
                            </div>
                          </div>
                        ) : (
                          reports.map((report) => (
                            <div
                              key={`${report.user_id}-${report.topic_id}`}
                              className="rtable-row"
                            >
                              <div className="rtable-cell topic-cell">
                                <div className="rtable-cell--content title-content">
                                  <h5>{report.user?.name || "User"}</h5>
                                  <p className="text-muted small">
                                    {report.user?.email || ""}
                                  </p>
                                </div>
                              </div>
                              <div className="rtable-cell id-cell">
                                <div className="rtable-cell--heading">
                                  Topic
                                </div>
                                <div className="rtable-cell--content date-content">
                                  {report.topic?.name || "Untitled"}
                                </div>
                              </div>
                              <div className="rtable-cell date-cell">
                                <div className="rtable-cell--heading">
                                  Grade
                                </div>
                                <div className="rtable-cell--content date-content">
                                  {report.total > 0
                                    ? Math.round(
                                        (report.score / report.total) * 100
                                      )
                                    : 0}
                                  %
                                </div>
                              </div>
                              <div className="rtable-cell amount-cell">
                                <div className="rtable-cell--heading">
                                  Signature
                                </div>
                                <div className="rtable-cell--content access-link-content">
                                  {report.signature ? (
                                    <img
                                      src={`${apiBase}/view-answer-signature/${report.signature}`}
                                      alt="Signature"
                                      //   width="80"
                                      className="img-thumbnail"
                                      onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src =
                                          "/path/to/placeholder.png";
                                      }}
                                    />
                                  ) : (
                                    <span className="text-muted">
                                      Not signed
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="rtable-cell card-cell">
                                <div className="rtable-cell--heading">Date</div>
                                <div className="rtable-cell--content replay-link-content">
                                  {new Date(
                                    report.created_at
                                  ).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
