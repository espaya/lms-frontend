import { useState, useEffect } from "react";
import MyHeader from "../../components/MyHeader";
import Sidebar from "../../components/Sidebar";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

export default function QuestionManager() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const apiBase = import.meta.env.VITE_API_URL;
  const [allSubjects, setAllSubjects] = useState([]);
  const [allTopics, setAllTopics] = useState([]);

  const [formData, setFormData] = useState({
    subject: "",
    topics: [""],
    questions: [
      {
        text: "",
        options: ["", "", "", ""],
        correctIndex: 0,
      },
    ],
  });

  // === Topic Functions ===
  const addTopic = () => {
    setFormData((prev) => ({
      ...prev,
      topics: [...prev.topics, ""],
    }));
  };

  const updateTopic = (index, value) => {
    const updated = [...formData.topics];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, topics: updated }));
  };

  const removeTopic = (index) => {
    if (formData.topics.length > 1) {
      const updated = [...formData.topics];
      updated.splice(index, 1);
      setFormData((prev) => ({ ...prev, topics: updated }));
    }
  };

  // === Question Functions ===
  const addQuestion = () => {
    setFormData((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          text: "",
          options: ["", "", "", ""],
          correctIndex: 0,
        },
      ],
    }));
  };

  const updateQuestionText = (qIndex, text) => {
    const updated = [...formData.questions];
    updated[qIndex].text = text;
    setFormData((prev) => ({ ...prev, questions: updated }));
  };

  const updateOption = (qIndex, optIndex, value) => {
    const updated = [...formData.questions];
    updated[qIndex].options[optIndex] = value;
    setFormData((prev) => ({ ...prev, questions: updated }));
  };

  const updateCorrectAnswer = (qIndex, correctIndex) => {
    const updated = [...formData.questions];
    updated[qIndex].correctIndex = correctIndex;
    setFormData((prev) => ({ ...prev, questions: updated }));
  };

  const removeQuestion = (qIndex) => {
    if (formData.questions.length > 1) {
      const updated = [...formData.questions];
      updated.splice(qIndex, 1);
      setFormData((prev) => ({ ...prev, questions: updated }));
    }
  };

  // === Form Validation ===
  const validateForm = () => {
    const newErrors = {};

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (formData.topics.some((topic) => !topic.trim())) {
      newErrors.topics = "All topics must have content";
    }

    if (formData.questions.some((q) => !q.text.trim())) {
      newErrors.questions = "All questions must have content";
    }

    if (formData.questions.some((q) => q.options.some((opt) => !opt.trim()))) {
      newErrors.options = "All options must have content";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // === Submit ===
  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      // Get CSRF token first
      await fetch(`${apiBase}/sanctum/csrf-cookie`, {
        credentials: "include",
      });

      const csrfToken = Cookies.get("XSRF-TOKEN");
      const authToken = localStorage.getItem("auth_token");

      if (!authToken) {
        throw new Error("Authentication token not found");
      }

      const response = await fetch(
        `${apiBase}/api/admin/dashboard/upload-questions`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authToken}`,
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-XSRF-TOKEN": csrfToken ? decodeURIComponent(csrfToken) : "",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );

      // Handle empty or non-JSON responses
      const responseText = await response.text();
      const result = responseText ? JSON.parse(responseText) : {};

      if (!response.ok) {
        throw new Error(
          result.message ||
            result.errors?.join?.("\n") ||
            "Failed to upload questions"
        );
      }

      // Success handling
      await Swal.fire({
        title: "Success!",
        text: result.message || "Questions uploaded successfully",
        icon: "success",
        confirmButtonText: "OK",
      });

      // Reset form
      setStep(1);
      setFormData({
        subject: "",
        topics: [""],
        questions: [{ text: "", options: ["", "", "", ""], correctIndex: 0 }],
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message || "An error occurred during upload",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  // Get all subjects
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        await fetch(`${apiBase}/sanctum/csrf-cookie`, {
          credentials: "include",
        });

        const csrfToken = Cookies.get("XSRF-TOKEN");
        const authToken = localStorage.getItem("auth_token");

        const res = await fetch(`${apiBase}/api/subjects`, {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${authToken}`,
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-XSRF-TOKEN": csrfToken ? decodeURIComponent(csrfToken) : "",
          },
        });

        const data = await res.json();

        console.log(data.data);

        if (!res.ok) {
          console.log(data.message);
        } else {
          setAllSubjects(data.data || []);
        }
      } catch (err) {
        console.error("Error fetching subjects:", err);
      }
    };

    fetchSubjects();
  }, []);

  // Get all topics
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        await fetch(`${apiBase}/sanctum/csrf-cookie`, {
          credentials: "include",
        });

        const csrfToken = Cookies.get("XSRF-TOKEN");
        const authToken = localStorage.getItem("auth_token");

        const res = await fetch(`${apiBase}/api/topics`, {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${authToken}`,
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-XSRF-TOKEN": csrfToken ? decodeURIComponent(csrfToken) : "",
          },
        });

        const data = await res.json();

        console.log(data.data);

        if (!res.ok) {
          console.log(data.message);
        } else {
          setAllTopics(data.data || []);
        }
      } catch (err) {
        console.error("Error fetching subjects:", err);
      }
    };

    fetchTopics();
  }, []);

  // === UI ===
  return (
    <>
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="assets/images/favicon.png"
      />
      <title>Question Manager - 1staccess Home Care</title>
      <div id="main-wrapper">
        <MyHeader />
        <Sidebar />
        <div className="content-body">
          <div className="container">
            <div className="page-title">
              <h3>Add Questions</h3>
              <p className="mb-2">Add multiple choice questions here</p>
            </div>

            {errors.general && (
              <div className="alert alert-danger">{errors.general}</div>
            )}

            <div className="card">
              <div className="card-body">
                {step === 1 && (
                  <>
                    <h4>Step 1: Add Subject</h4>
                    <select
                      className="form-select mb-2"
                      value={formData.subject}
                      onChange={(e) => {
                        const selected = e.target.value;
                        setFormData((prev) => ({ ...prev, subject: selected }));
                      }}
                    >
                      <option value="">-- Select an existing subject --</option>
                      {allSubjects.map((subj) => (
                        <option key={subj.id} value={subj.name}>
                          {subj.name}
                        </option>
                      ))}
                    </select>

                    <p className="text-muted mt-10">Or enter a new subject:</p>
                    <input
                      type="text"
                      className={`form-control mb-3 ${
                        errors.subject ? "is-invalid" : ""
                      }`}
                      placeholder="Enter New Subject"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      autoComplete="off"
                    />

                    {errors.subject && (
                      <div className="invalid-feedback">{errors.subject}</div>
                    )}
                    <button
                      className="btn btn-primary mt-10"
                      onClick={() => {
                        if (formData.subject.trim()) setStep(2);
                      }}
                      disabled={!formData.subject.trim()}
                    >
                      Continue
                    </button>
                  </>
                )}

                {step === 2 && (
                  <>
                    <h4>Step 2: Add Topics</h4>
                    {errors.topics && (
                      <div className="alert alert-danger mb-3">
                        {errors.topics}
                      </div>
                    )}
                    {formData.topics.map((topic, index) => (
                      <div key={index} className="mb-3">
                        <label>Topic {index + 1}</label>
                        <select
                          className="form-select mb-1"
                          value={topic}
                          onChange={(e) => updateTopic(index, e.target.value)}
                        >
                          <option value="">-- Select existing topic --</option>
                          {allTopics.map((t) => (
                            <option key={t.id} value={t.name}>
                              {t.name}
                            </option>
                          ))}
                        </select>

                        <input
                          type="text"
                          className="form-control"
                          placeholder="Or enter new topic"
                          value={topic}
                          onChange={(e) => updateTopic(index, e.target.value)}
                        />

                        {formData.topics.length > 1 && (
                          <button
                            className="btn btn-outline-danger mt-1"
                            onClick={() => removeTopic(index)}
                          >
                            &times; Remove
                          </button>
                        )}
                      </div>
                    ))}

                    <button
                      className="btn btn-secondary me-2"
                      onClick={addTopic}
                    >
                      + Add Topic
                    </button>

                    <div className="mt-3">
                      <button
                        className="btn btn-secondary me-2"
                        onClick={() => setStep(1)}
                      >
                        Back
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => setStep(3)}
                        disabled={formData.topics.some((t) => !t.trim())}
                      >
                        Next
                      </button>
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <h4>Step 3: Add Questions</h4>
                    {(errors.questions || errors.options) && (
                      <div className="alert alert-danger mb-3">
                        {errors.questions || errors.options}
                      </div>
                    )}
                    {formData.questions.map((q, qIndex) => (
                      <div
                        key={qIndex}
                        className="mb-4 p-3 border rounded position-relative"
                      >
                        <button
                          className="btn-close position-absolute top-0 end-0"
                          onClick={() => removeQuestion(qIndex)}
                          disabled={formData.questions.length <= 1}
                        />
                        <input
                          type="text"
                          className={`form-control mb-2 ${
                            errors.questions ? "is-invalid" : ""
                          }`}
                          placeholder={`Question ${qIndex + 1}`}
                          value={q.text}
                          onChange={(e) =>
                            updateQuestionText(qIndex, e.target.value)
                          }
                        />
                        {q.options.map((opt, optIndex) => (
                          <div key={optIndex} className="input-group mb-1">
                            <input
                              type="text"
                              className={`form-control ${
                                errors.options ? "is-invalid" : ""
                              }`}
                              placeholder={`Option ${optIndex + 1}`}
                              value={opt}
                              onChange={(e) =>
                                updateOption(qIndex, optIndex, e.target.value)
                              }
                            />
                            <span className="input-group-text">
                              <input
                                type="radio"
                                name={`correct-${qIndex}`}
                                checked={q.correctIndex === optIndex}
                                onChange={() =>
                                  updateCorrectAnswer(qIndex, optIndex)
                                }
                              />
                              &nbsp;Correct
                            </span>
                          </div>
                        ))}
                      </div>
                    ))}

                    <button
                      className="btn btn-secondary me-2"
                      onClick={addQuestion}
                    >
                      + Add Question
                    </button>

                    <div className="mt-3">
                      <button
                        className="btn btn-secondary me-2"
                        onClick={() => setStep(2)}
                      >
                        Back
                      </button>
                      <button
                        className="btn btn-success"
                        onClick={handleSubmit}
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            Submitting...
                          </>
                        ) : (
                          "Submit"
                        )}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
