import { useState, useRef, useEffect } from "react";
import MyHeader from "../../../components/MyHeader";
import Sidebar from "../../../components/Sidebar";
import Nav from "./Nav";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import Pagination from "../../../components/Pagination";

export default function Quizzes() {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [errors, setErrors] = useState({});
  const [quizzes, setQuizzes] = useState([]);
  const apiBase = import.meta.env.VITE_API_URL;
  const { username } = useParams();
  const [loading, setLoading] = useState(false);

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  //   Get quiz reports for this user
  useEffect(() => {
    const Quizzes = async () => {
      setErrors({});
      setLoading(true);
      try {
        await fetch(`${apiBase}/sanctum/csrf-cookie`, {
          credentials: "include",
        });

        const csrfToken = Cookies.get("XSRF-TOKEN");
        const authToken = localStorage.getItem("auth_token");

        const response = await fetch(
          `${apiBase}/api/users/single/${username}/quizzes`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "X-XSRF-TOKEN": decodeURIComponent(csrfToken),
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          if (data.message) {
            setErrors({ general: data.message });
          }
        } else {
          setQuizzes(data);
        }
      } catch (err) {
        setErrors({ general: err.message });
      } finally {
        setLoading(false);
      }
    };
    Quizzes();
  }, [apiBase, username]);

  return (
    <div id="main-wrapper">
      <MyHeader />
      <Sidebar />
      <div className="content-body">
        <div className="container">
          <div className="page-title">
            <div className="row align-items-center justify-content-between">
              <div className="col-md-6">
                <div className="page-title-content">
                  <h3>Quizzes</h3>
                  <p className="mb-2">Manage all quizzes taken by user</p>
                </div>
              </div>
              <div className="col-auto">
                <div className="breadcrumbs">
                  <a href="#">Profile </a>
                  <span>
                    <i className="ri-arrow-right-s-line"></i>
                  </span>
                  <a href="#">Quizzes</a>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <Nav username={username} />
            {loading ? (
              <div className="text-center my-5">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <div className="col-md-9">
                <div className="card">
                  <div className="card-body">
                    {quizzes.answers && quizzes.answers.length > 0 ? (
                      quizzes.answers.map((quiz, index) => (
                        <div key={index}>
                          <div className="verify-content d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center">
                              <span className="me-16 icon-circle bg-primary text-white">
                                <i className="ri-file-warning-line"></i>
                              </span>
                              <div className="primary-number">
                                <p className="mb-0">
                                  <strong>
                                    {quiz.topic?.name || "No Topic"}
                                  </strong>
                                </p>
                                <small
                                  style={{
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                  }}
                                  className="text-success"
                                >
                                  Score: {quiz.score} / {quiz.total} (
                                  {((quiz.score / quiz.total) * 100).toFixed(2)}
                                  %) |{" "}
                                  {new Date(quiz.created_at).toLocaleDateString(
                                    "en-US",
                                    {
                                      month: "short",
                                      day: "numeric",
                                      year: "numeric",
                                    }
                                  )}{" "}
                                  | {quiz.signature ? "Signed" : "Not Signed"}
                                </small>
                              </div>
                            </div>

                            {/* Export Icon Button */}
                            <div
                              className="position-relative"
                              ref={dropdownRef}
                            >
                              <button
                                className="btn btn-primary"
                                onClick={toggleDropdown}
                              >
                                <i className="ri-download-2-line" />
                              </button>

                              {showDropdown && (
                                <ul
                                  className="dropdown-menu show"
                                  style={{
                                    position: "absolute",
                                    top: "100%",
                                    right: 0,
                                    minWidth: "120px",
                                  }}
                                >
                                  <li>
                                    <a className="dropdown-item" href="#">
                                      <i className="ri-file-pdf-fill text-danger me-2" />{" "}
                                      PDF
                                    </a>
                                  </li>
                                  <li>
                                    <a className="dropdown-item" href="#">
                                      <i className="ri-file-excel-fill text-success me-2" />{" "}
                                      Excel
                                    </a>
                                  </li>
                                </ul>
                              )}
                            </div>
                          </div>

                          <hr className="dropdown-divider my-16" />
                        </div>
                      ))
                    ) : (
                      <div className="alert alert-info mx-auto">
                        No quizzes found for this user..
                      </div>
                    )}

                    <Pagination
                      currentPage={quizzes.meta?.current_page || 1}
                      lastPage={quizzes.meta?.last_page || 1}
                      onPageChange={(page) => fetchQuizzes(page)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
