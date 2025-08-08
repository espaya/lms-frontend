import { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import AttemptSummary from "./AttemptSummary";
import Cookies from "js-cookie";
import { AuthContext } from "../../../auth/AuthContext";

export default function ViewQuestions({
  topic,
  questionsByTopic,
  handleAnswerChange,
  gradesByTopic,
  setGradesByTopic,
  studentAnswers,
}) {
  const questions = questionsByTopic[topic] || [];
  const apiBase = import.meta.env.VITE_API_URL;
  const [errors, setErrors] = useState({});
  const [submittedTopics, setSubmittedTopics] = useState({});
  const [loading, setLoading] = useState(false);
  const [submittedAnswers, setSubmittedAnswers] = useState({});
  const { user } = useContext(AuthContext);

  // Fetch submitted answers from DB if topic is already submitted
  const fetchSubmittedAnswers = async (topicId) => {
    try {
      await fetch(`${apiBase}/sanctum/csrf-cookie`, {
        credentials: "include",
      });

      const csrfToken = Cookies.get("XSRF-TOKEN");

      const res = await fetch(`${apiBase}/api/answers/all/${topicId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          Accept: "application/json",
          "X-XSRF-TOKEN": decodeURIComponent(csrfToken),
        },
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors({ general: data.message || "Failed to fetch answers" });
      } else {
        setSubmittedAnswers((prev) => ({
          ...prev,
          [topicId]: data.answers,
        }));
      }
    } catch (err) {
      setErrors({ general: err.message || err });
    }
  };

  useEffect(() => {
    // if (submittedTopics[String(topic)]) {
    fetchSubmittedAnswers(topic);
    // }
  }, [submittedTopics, topic]);

  const handleSubmitAnswers = async (e, topicId) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    const answers = studentAnswers[topicId] || {};
    const topicQuestions = questionsByTopic[topicId] || [];

    let correct = 0;
    topicQuestions.forEach((q) => {
      const userAnswer = answers[q.id];
      if (userAnswer !== undefined && userAnswer === q.correct_index) {
        correct++;
      }
    });

    const totalQuestions = topicQuestions.length;
    const startTime = new Date();
    const endTime = new Date();
    const timeTaken = `${(endTime - startTime) / 1000}s`;

    setGradesByTopic((prev) => ({
      ...prev,
      [topicId]: {
        attempted: Object.keys(answers).length,
        correct,
        total: totalQuestions,
        time: timeTaken,
      },
    }));

    const payload = {
      topic_id: topicId,
      score: correct,
      total: totalQuestions,
      time: timeTaken,
      answers: Object.entries(answers).map(([questionId, answerIndex]) => ({
        question_id: questionId,
        answer_index: answerIndex,
        correct_index:
          topicQuestions.find((q) => q.id == questionId)?.correct_index ?? null,
      })),
    };

    try {
      await fetch(`${apiBase}/sanctum/csrf-cookie`, {
        credentials: "include",
      });

      const csrfToken = Cookies.get("XSRF-TOKEN");

      const res = await fetch(`${apiBase}/api/answers`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          "X-XSRF-TOKEN": decodeURIComponent(csrfToken),
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setErrors({ general: data.message });
        }
        throw new Error(data.message || "Failed to submit answers");
      }

      setSubmittedTopics((prev) => ({ ...prev, [topicId]: true }));
      setSubmittedAnswers((prev) => ({ ...prev, [topicId]: payload.answers }));

      Swal.fire({
        icon: "success",
        title: "Success",
        text: data.message || "Answers submitted successfully!",
      });
    } catch (err) {
      setErrors({ general: err.message });
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message || "Failed to submit answers",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {errors &&
        Object.values(errors).map((error, index) => (
          <div className="col-12 alert alert-danger" key={index}>
            <ul className="mb-0">
              <li>{error}</li>
            </ul>
          </div>
        ))}

      <div className="rtable-row bg-light">
        <div className="rtable-cell" style={{ padding: "20px" }} colSpan={4}>
          {questions.length > 0 ? (
            <form
              onSubmit={(e) => handleSubmitAnswers(e, topic)}
              className="mb-4"
            >
              <ul className="list-group list-group-flush">
                {submittedAnswers[topic] && submittedAnswers[topic].length > 0
                  ? // REVIEW MODE
                    submittedAnswers[topic].map((answer, index) => {
                      const {
                        id,
                        question_text,
                        options,
                        correct_index,
                        user_answer,
                        is_correct,
                      } = answer;

                      return (
                        <li key={id} className="list-group-item">
                          <strong>Q{index + 1}:</strong> {question_text}{" "}
                          {is_correct ? (
                            <span
                              style={{ color: "green", fontWeight: "bold" }}
                            >
                              ✅ Correct
                            </span>
                          ) : (
                            <span style={{ color: "red", fontWeight: "bold" }}>
                              ❌ Wrong
                            </span>
                          )}
                          <div>
                            {options.map((opt, i) => {
                              const isUserChoice = i === user_answer;
                              const isRightAnswer = i === correct_index;

                              let optionStyle = {};
                              if (isUserChoice && is_correct) {
                                optionStyle = {
                                  color: "green",
                                  fontWeight: "bold",
                                };
                              } else if (isUserChoice && !is_correct) {
                                optionStyle = {
                                  color: "red",
                                  fontWeight: "bold",
                                };
                              } else if (isRightAnswer) {
                                optionStyle = { color: "blue" };
                              }

                              return (
                                <div key={i} className="form-check">
                                  <input
                                    type="radio"
                                    name={`question-${id}`}
                                    value={i}
                                    className="form-check-input"
                                    checked={isUserChoice}
                                    disabled
                                    readOnly
                                  />
                                  <label
                                    className="form-check-label"
                                    style={optionStyle}
                                  >
                                    {opt}
                                  </label>
                                  {isRightAnswer && (
                                    <span
                                      style={{
                                        marginLeft: "10px",
                                        color: "blue",
                                      }}
                                    >
                                      (Correct Answer)
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </li>
                      );
                    })
                  : // ANSWERING MODE
                    questions.map((question, qIndex) => {
                      let options = question.options;
                      if (typeof options === "string") {
                        try {
                          options = JSON.parse(options);
                        } catch {
                          options = [];
                        }
                      }

                      return (
                        <li key={question.id} className="list-group-item">
                          <strong>Q{qIndex + 1}:</strong>{" "}
                          {question.question_text}
                          <div>
                            {options.map((opt, i) => (
                              <div key={i} className="form-check">
                                <input
                                  type="radio"
                                  name={`question-${question.id}`}
                                  value={i}
                                  className="form-check-input"
                                  required
                                  onChange={(e) =>
                                    handleAnswerChange(
                                      topic,
                                      question.id,
                                      parseInt(e.target.value)
                                    )
                                  }
                                />
                                <label className="form-check-label">
                                  {opt}
                                </label>
                              </div>
                            ))}
                          </div>
                        </li>
                      );
                    })}
              </ul>

              {/* Show button only if not submitted */}
              {!submittedTopics[topic] && (
                <button type="submit" className="btn btn-primary mt-20">
                  {loading ? "Processing..." : "Submit Answers"}
                </button>
              )}

              <AttemptSummary
                apiBase={apiBase}
                topic={topic}
                setErrors={setErrors}
              />
            </form>
          ) : (
            <p>No questions found.</p>
          )}
        </div>
      </div>
    </>
  );
}
