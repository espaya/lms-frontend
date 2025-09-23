import React, { useEffect, useState } from "react";
import MyHeader from "../../components/MyHeader";
import Sidebar from "../../components/Sidebar";
import Cookies from "js-cookie";
import Pagination from "../../components/Pagination";
import { PATHS } from "../../router";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { formatDate } from "../../utils/DateFormatter";

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 10,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const apiBase = import.meta.env.VITE_API_URL;
  const reportRef = useRef(null);

  const navigate = useNavigate();

  const fetchReports = async (page = 1) => {
    setLoading(true);

    try {
      await fetch(`${apiBase}/sanctum/csrf-cookie`, {
        credentials: "include",
      });

      const csrfToken = Cookies.get("XSRF-TOKEN");
      const authToken = localStorage.getItem("auth_token");

      const response = await fetch(
        `${apiBase}/api/admin/dashboard/get-subjects?page=${page}`,
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

      const data = await response.json();

      if (!response.ok) {
        setErrors({ general: data.message });
        return;
      }
      setReports(data.data);
      setPagination({
        current_page: data.pagination.current_page,
        last_page: data.pagination.last_page,
        total: data.pagination.total,
        per_page: data.pagination.per_page,
      });
      setErrors(null);
    } catch (err) {
      setErrors({ general: err.message || "Failed to fetch reports" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [apiBase]);

  const handlePageChange = (page) => {
    fetchReports(page);
  };

  return (
    <>
      <title>Reports - 1staccess Home Care </title>

      <div id="main-wrapper">
        <MyHeader />
        <Sidebar />
        <div className="content-body">
          <div className="container">
            <div className="page-title">
              <div className="row align-items-center justify-content-between">
                <div className="col-md-6">
                  <div className="page-title-content">
                    <h3>Reports</h3>
                    <p className="mb-2">Generate monthly reports for quizzes</p>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="breadcrumbs">
                    <a href="#">Home </a>
                    <span>
                      <i className="ri-arrow-right-s-line" />
                    </span>
                    <a href="#">Reports</a>
                  </div>
                </div>
              </div>
            </div>
            {errors?.general && (
              <div className="alert alert-danger">{errors?.general}</div>
            )}
            <div className="row">
              <div className="col-xl-8 col-lg-8 mx-auto">
                <div className="card transparent">
                  <div className="card-body">
                    {loading ? (
                      <div className="text-center my-5">
                        <div
                          className="spinner-border"
                          role="status"
                          ref={reportRef}
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    ) : (
                      <>
                        {reports.map(
                          (report) =>
                            report.topics &&
                            report.topics.length > 0 &&
                            report.topics.map((topic) => (
                              <div
                                key={topic.id}
                                className="bg-white py-12 px-12 rounded d-flex mb-20 justify-content-between align-items-center shadow-sm"
                              >
                                <div className="payout-icon bg-success-lighten text-success">
                                  <i className="ri-file-text-line" />
                                </div>
                                <div className="flex-grow-1">
                                  <h5 className="mb-5">{topic.name}</h5>
                                  <p className="mb-0">
                                    {formatDate(topic.created_at)}
                                  </p>
                                  <small className="text-muted">
                                    <a
                                      href={`${apiBase}/view-question-file/${topic.fileName}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      File: {topic.fileName}
                                    </a>
                                  </small>
                                </div>
                                <a
                                  onClick={(e) => {
                                    e.preventDefault();
                                    navigate(
                                      `/admin/dashboard/reports/${topic.id}`
                                    );
                                  }}
                                  className="btn btn-primary"
                                  href="#"
                                >
                                  Preview
                                </a>
                              </div>
                            ))
                        )}
                        <Pagination
                          currentPage={pagination.current_page}
                          lastPage={pagination.last_page}
                          total={pagination.total}
                          perPage={pagination.per_page}
                          onPageChange={handlePageChange}
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
