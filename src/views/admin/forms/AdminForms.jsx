import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import Cookies from "js-cookie";
import Pagination from "../../../components/Pagination";
import { useNavigate, Link } from "react-router-dom";
import { formatDate } from "../../../utils/DateFormatter";
import MyHeader from "../../../components/MyHeader";
import { PATHS } from "../../../router";

export default function AdminForms() {
  const [forms, setForms] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 10,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const apiBase = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  const fetchForms = async (page = 1) => {
    setLoading(true);
    setErrors({});

    try {
      await fetch(`${apiBase}/sanctum/csrf-cookie`, {
        credentials: "include",
      });

      const csrfToken = Cookies.get("XSRF-TOKEN");
      const authToken = localStorage.getItem("auth_token");

      // ⬇ Changed to the new endpoint
      const response = await fetch(
        `${apiBase}/api/admin/dashboard/get-forms?page=${page}`,
        {
          credentials: "include",
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "X-XSRF-TOKEN": csrfToken ? decodeURIComponent(csrfToken) : "",
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setErrors({ general: data.message || "Failed to fetch forms" });
        return;
      }
      
      setForms(data.data);
      setPagination({
        current_page: data.pagination.current_page,
        last_page: data.pagination.last_page,
        total: data.pagination.total,
        per_page: data.pagination.per_page,
      });
    } catch (err) {
      setErrors({ general: err.message || "Failed to fetch forms" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForms();
  }, [apiBase]);

  const handlePageChange = (page) => {
    fetchForms(page);
  };

  return (
    <>
      <title>Forms & Documents - 1staccess Home Care</title>

      <div id="main-wrapper">
        <MyHeader />
        <Sidebar />
        <div className="content-body">
          <div className="container">
            <div className="page-title">
              <div className="row align-items-center justify-content-between">
                <div className="col-md-6">
                  <div className="page-title-content">
                    <h3>Forms & Documents</h3>
                    <p className="mb-2">
                      Manage and upload employee forms here
                    </p>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="breadcrumbs">
                    <a href="#">Home </a>
                    <span>
                      <i className="ri-arrow-right-s-line" />
                    </span>
                    <a href="#">Forms & Documents</a>
                  </div>
                  <Link to={PATHS.ADMIN_UPLOAD_FORMS} className="btn btn-primary mt-10">
                    Upload
                  </Link>
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
                        <div className="spinner-border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    ) : (
                      <>
                        {forms.length > 0 ? (
                          forms.map((form) => (
                            <div
                              key={form.id}
                              className="bg-white py-12 px-12 rounded d-flex mb-20 justify-content-between align-items-center shadow-sm"
                            >
                              <div className="payout-icon bg-primary-lighten text-primary">
                                <i className="ri-file-text-line fs-24" />
                              </div>
                              <div className="flex-grow-1 ms-3">
                                <h5 className="mb-1">{form.form_name}</h5>
                                <p className="mb-1">
                                  {formatDate(form.created_at)}
                                </p>
                                
                              </div>
                              <div>
                                <Link
                                  to={`${apiBase}/storage/${form.document_path}`}
                                //   className="btn-sm btn-primary"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <i className="ri-eye-line fs-24" />
                                </Link>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="alert alert-info text-center">
                            No forms uploaded yet.
                          </div>
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