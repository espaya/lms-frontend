import { useEffect, useState } from "react";
import MyHeader from "../../components/MyHeader";
import Sidebar from "../../components/Sidebar";
import Cookies from "js-cookie";

export default function Subject() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0,
  });
  const apiBase = import.meta.env.VITE_API_URL;
  const [errors, setErrors] = useState({});

  const fetchSubjects = async (page = 1) => {
    setLoading(true);
    try {
      await fetch(`${apiBase}/sanctum/csrf-cookie`, {
        credentials: "include",
      });

      const csrfToken = Cookies.get("XSRF-TOKEN");
      const authToken = localStorage.getItem("auth_token");

      const response = await fetch(`${apiBase}/api/subjects?page=${page}`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${authToken}`,
          "X-XSRF-TOKEN": decodeURIComponent(csrfToken),
        },
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.message) {
          setErrors({ general: data.message });
        }
      } else {
        setSubjects(data.data);
        setPagination({
          current_page: data.current_page,
          last_page: data.last_page,
          per_page: data.per_page,
          total: data.total,
        });
      }
    } catch (err) {
      setErrors({ general: err.message });
      setTimeout(() => setErrors({}), 3500);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handlePageChange = (page) => {
    fetchSubjects(page);
  };

  return (
    <>
      <title>Subjects - 1staccess Home Care</title>
      <div id="main-wrapper">
        <MyHeader />
        <Sidebar />
        <div className="content-body">
          <div className="container">
            <div className="page-title">
              <div className="row align-items-center justify-content-between">
                <div className="col-md-6">
                  <div className="page-title-content">
                    <h3>Subjects</h3>
                    <p className="mb-2">Welcome to 1staccess Dashboard</p>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="breadcrumbs">
                    <a href="#">Home </a>
                    <span>
                      <i className="ri-arrow-right-s-line" />
                    </span>
                    <a href="#">Subjects</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-8 col-lg-8 mx-auto">
                <div className="card transparent">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <h4 className="card-title">All Subjects</h4>
                    <a
                      href="/admin/dashboard/question-manager"
                      className="btn btn-primary btn-sm"
                    >
                      Add New Question
                    </a>
                  </div>
                  <div className="card-body">
                    {loading ? (
                      <div className="text-center py-4">
                        <div
                          className="spinner-border text-primary"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    ) : errors.general ? (
                      <div className="alert alert-danger">{errors.general}</div>
                    ) : subjects.length === 0 ? (
                      <div className="text-center py-4">No subjects found</div>
                    ) : (
                      <>
                        {subjects.map((subject) => (
                          <div
                            key={subject.id}
                            className="bg-white py-3 px-4 rounded d-flex mb-3 justify-content-between align-items-center shadow-sm"
                          >
                            <div className="payout-icon bg-primary-lighten text-primary">
                              <i className="ri-book-line"></i>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <h5 className="mb-1">{subject.name}</h5>
                              <p className="mb-0 text-muted small">
                                Created:{" "}
                                {new Date(
                                  subject.created_at
                                ).toLocaleDateString()}
                              </p>
                            </div>
                            <a
                              className="btn btn-primary"
                              href={`/admin/dashboard/subjects/${subject.slug}`}
                            >
                              <i className="ri-eye-line"></i>
                            </a>
                            <a className="btn btn-danger" href="#">
                              <i className="ri-delete-bin-line"></i>
                            </a>
                          </div>
                        ))}

                        {/* Pagination */}
                        <nav className="mt-4">
                          <ul className="pagination justify-content-center">
                            {Array.from(
                              { length: pagination.last_page },
                              (_, i) => i + 1
                            ).map((page) => (
                              <li
                                key={page}
                                className={`page-item ${
                                  pagination.current_page === page
                                    ? "active"
                                    : ""
                                }`}
                              >
                                <button
                                  className="page-link"
                                  onClick={() => handlePageChange(page)}
                                  disabled={pagination.current_page === page}
                                >
                                  {page}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </nav>
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
