import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import MyHeader from "../../components/MyHeader";
import Sidebar from "../../components/Sidebar";

export default function AllQuestions() {
  const [questions, setQuestions] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
    perPage: 10,
    total: 0,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const apiBase = import.meta.env.VITE_API_URL;
  const [visibleQuestions, setVisibleQuestions] = useState({});
  const [questionsByTopic, setQuestionsByTopic] = useState({});

  const fetchQuestions = async (page = 1) => {
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
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-XSRF-TOKEN": csrfToken ? decodeURIComponent(csrfToken) : "",
          },
        }
      );

      const data = await response.json();

      console.log(data.data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch questions");
      }

      setQuestions(data.data);
      setPagination({
        currentPage: data.pagination.current_page,
        lastPage: data.pagination.last_page,
        perPage: data.pagination.per_page,
        total: data.pagination.total,
      });
    } catch (err) {
      setErrors({ general: err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handlePageChange = (page) => {
    fetchQuestions(page);
  };

  const fetchQuestionsForTopic = async (topicId) => {
    if (questionsByTopic[topicId]) {
      // Already fetched, just toggle
      setVisibleQuestions((prev) => ({
        ...prev,
        [topicId]: !prev[topicId],
      }));
      return;
    }

    try {
      const csrfToken = Cookies.get("XSRF-TOKEN");
      const authToken = localStorage.getItem("auth_token");

      const response = await fetch(
        `${apiBase}/api/topics/${topicId}/questions`,
        {
          credentials: "include",
          headers: {
            Authorization: `Bearer ${authToken}`,
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-XSRF-TOKEN": csrfToken ? decodeURIComponent(csrfToken) : "",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch questions");
      }

      setQuestionsByTopic((prev) => ({
        ...prev,
        [topicId]: data.questions,
      }));

      setVisibleQuestions((prev) => ({
        ...prev,
        [topicId]: true,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="assets/images/favicon.png"
      />
      <title>All Questions - 1staccess Home Care</title>
      <div id="main-wrapper">
        <MyHeader />
        <Sidebar />
        <div className="content-body">
          <div className="container">
            <div className="page-title">
              <div className="row align-items-center justify-content-between">
                <div className="col-md-6">
                  <div className="page-title-content">
                    <h3>Manage Questions</h3>
                    <p className="mb-2">Manage all available questions here</p>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="breadcrumbs">
                    <a href="#">Home </a>
                    <span>
                      <i className="ri-arrow-right-s-line" />
                    </span>
                    <a href="#">Manage Questions</a>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <a
                      href="/admin/dashboard/question-manager"
                      className="btn btn-primary mt-10"
                    >
                      Add New Question
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className="card transparent">
                  <div className="card-body">
                    {errors.general && (
                      <div className="alert alert-danger">{errors.general}</div>
                    )}

                    {loading ? (
                      <div className="text-center my-5">
                        <div className="spinner-border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="rtable rtable--5cols rtable--collapse">
                          <div className="rtable-row rtable-row--head bg-transparent">
                            <div className="rtable-cell topic-cell column-heading text-dark">
                              <strong>Subject</strong>
                            </div>
                            <div className="rtable-cell id-cell column-heading text-dark">
                              <strong>Topic</strong>
                            </div>
                            <div className="rtable-cell date-cell column-heading text-dark">
                              <strong>Created At</strong>
                            </div>
                            <div className="rtable-cell receipt-cell column-heading text-dark">
                              <strong>Actions</strong>
                            </div>
                          </div>

                          {questions.map((subject) =>
                            subject.topics.map((topic) => (
                              <React.Fragment key={`${subject.id}-${topic.id}`}>
                                {/* Main topic row */}
                                <div className="rtable-row">
                                  <div className="rtable-cell topic-cell">
                                    <div className="rtable-cell--content title-content">
                                      <h5>{subject.name}</h5>
                                    </div>
                                  </div>
                                  <div className="rtable-cell id-cell">
                                    <div className="rtable-cell--heading">
                                      Topic
                                    </div>
                                    <div className="rtable-cell--content date-content">
                                      {topic.name}
                                    </div>
                                  </div>
                                  <div className="rtable-cell rtable-cell--foot status-cell">
                                    <div className="rtable-cell--heading">
                                      Created At
                                    </div>
                                    <div className="rtable-cell--content purchase-content">
                                      {new Date(
                                        topic.created_at
                                      ).toLocaleDateString()}
                                    </div>
                                  </div>
                                  <div className="rtable-cell rtable-cell--foot receipt-cell">
                                    <div className="rtable-cell--heading">
                                      Actions
                                    </div>
                                    <div className="rtable-cell--content pdf-content">
                                      <a
                                        href="#"
                                        className="icon-link"
                                        title="View"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          fetchQuestionsForTopic(topic.id);
                                        }}
                                      >
                                        <i
                                          style={{ fontSize: "18px" }}
                                          className="ri-eye-line"
                                        />
                                      </a>
                                      <a
                                        href="#"
                                        className="icon-link"
                                        title="Delete"
                                      >
                                        <i
                                          style={{ fontSize: "18px" }}
                                          className="ri-delete-bin-line"
                                        ></i>
                                      </a>
                                    </div>
                                  </div>
                                </div>

                                {/* Expanded questions row */}
                                {visibleQuestions[topic.id] && (
                                  <div className="rtable-row bg-light">
                                    <div
                                      className="rtable-cell"
                                      style={{ padding: "20px" }}
                                      colSpan={4}
                                    >
                                      {questionsByTopic[topic.id]?.length >
                                      0 ? (
                                        <ul className="list-group list-group-flush">
                                          {questionsByTopic[topic.id].map(
                                            (question, index) => (
                                              <li
                                                key={question.id}
                                                className="list-group-item"
                                              >
                                                <strong>Q{index + 1}:</strong>{" "}
                                                {question.question_text}
                                                <ul>
                                                  {JSON.parse(
                                                    question.options
                                                  ).map((opt, i) => (
                                                    <li key={i}>
                                                      {opt}
                                                      {i ===
                                                        question.correct_index && (
                                                        <span className="badge bg-success ms-2">
                                                          Correct
                                                        </span>
                                                      )}
                                                    </li>
                                                  ))}
                                                </ul>
                                              </li>
                                            )
                                          )}
                                        </ul>
                                      ) : (
                                        <p>No questions found.</p>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </React.Fragment>
                            ))
                          )}
                        </div>

                        {/* Pagination Component */}
                        <div className="d-flex justify-content-center mt-20">
                          <nav aria-label="Page navigation">
                            <ul className="pagination">
                              <li
                                className={`page-item ${
                                  pagination.currentPage === 1 ? "disabled" : ""
                                }`}
                              >
                                <button
                                  className="page-link"
                                  onClick={() =>
                                    handlePageChange(pagination.currentPage - 1)
                                  }
                                  disabled={pagination.currentPage === 1}
                                >
                                  Previous
                                </button>
                              </li>

                              {Array.from(
                                { length: pagination.lastPage },
                                (_, i) => i + 1
                              ).map((number) => (
                                <li
                                  key={number}
                                  className={`page-item ${
                                    pagination.currentPage === number
                                      ? "active"
                                      : ""
                                  }`}
                                >
                                  <button
                                    className="page-link"
                                    onClick={() => handlePageChange(number)}
                                  >
                                    {number}
                                  </button>
                                </li>
                              ))}

                              <li
                                className={`page-item ${
                                  pagination.currentPage === pagination.lastPage
                                    ? "disabled"
                                    : ""
                                }`}
                              >
                                <button
                                  className="page-link"
                                  onClick={() =>
                                    handlePageChange(pagination.currentPage + 1)
                                  }
                                  disabled={
                                    pagination.currentPage ===
                                    pagination.lastPage
                                  }
                                >
                                  Next
                                </button>
                              </li>
                            </ul>
                          </nav>
                        </div>
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
