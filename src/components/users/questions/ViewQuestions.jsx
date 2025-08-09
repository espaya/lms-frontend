import { useState, useEffect, useContext, useRef } from "react";
import Swal from "sweetalert2";
import AttemptSummary from "./AttemptSummary";
import Cookies from "js-cookie";
import { AuthContext } from "../../../auth/AuthContext";
import SignatureCanvas from "react-signature-canvas";
import trimCanvas from "trim-canvas";

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
  const [signature, setSignature] = useState(null);
  const [agreed, setAgreed] = useState(false);
  const sigPadRef = useRef(null);

  const clearSignature = () => {
    sigPadRef.current.clear();
    setSignature("");
  };

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
    fetchSubmittedAnswers(topic);
  }, [submittedTopics, topic]);

  // Add this function to explicitly capture signature
  const captureSignature = () => {
    if (sigPadRef.current && !sigPadRef.current.isEmpty()) {
      const trimmed = trimCanvas(sigPadRef.current.getCanvas());
      const sigData = trimmed.toDataURL("image/png");
      setSignature(sigData);
      return sigData;
    }
    Swal.fire({ title: "Error", text: "Please signature is required" });
    return null;
  };

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

    // ✅ Check if score is less than 80%
    const scorePercentage = (correct / totalQuestions) * 100;
    if (scorePercentage < 80) {
      Swal.fire({
        icon: "warning",
        title: "Retake Required",
        text: `Your score is ${scorePercentage.toFixed(
          2
        )}%. You need at least 80% to submit. Please retake the quiz.`,
      });
      setLoading(false);
      return; // stop submission
    }

    // Explicitly capture signature before submission
    const currentSignature = captureSignature();
    if (!currentSignature) {
      setErrors({ signature: ["Please provide a valid signature"] });
      return;
    }

    // Prepare payload with signature
    const payload = {
      topic_id: topicId,
      score: correct,
      total: totalQuestions,
      time: timeTaken,
      signature: currentSignature, // Make sure this is properly set
      declaration: agreed,
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
                            {Array.isArray(options) && options.length > 0 ? (
                              options.map((opt, i) => {
                                const isUserChoice = i === user_answer;
                                const isRightAnswer = i === correct_index;

                                let optionStyle = {};
                                if (isUserChoice && is_correct === true) {
                                  optionStyle = {
                                    color: "green",
                                    fontWeight: "bold",
                                  };
                                } else if (
                                  isUserChoice &&
                                  is_correct === false
                                ) {
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
                                      name={`question-${id ?? "unknown"}`}
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
                              })
                            ) : (
                              <p>No options available</p>
                            )}
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

              {/* Signature Pad */}
              {submittedTopics?.[topic] !== true && (
                <>
                  <div className="mt-20">
                    <div>
                      <strong>Signature:</strong>
                    </div>
                    <div className="mt-20">
                      <SignatureCanvas
                        penColor="black"
                        canvasProps={{
                          width: 500,
                          height: 150,
                          className: "signature-canvas border",
                        }}
                        ref={sigPadRef}
                        onEnd={() => {
                          if (sigPadRef.current) {
                            const trimmed = trimCanvas(
                              sigPadRef.current.getCanvas()
                            );
                            setSignature(trimmed.toDataURL("image/png"));
                          }
                        }}
                      />
                    </div>
                    <button
                      type="button"
                      className="btn btn-secondary mt-2"
                      onClick={clearSignature}
                    >
                      Clear Signature
                    </button>
                  </div>
                  {errors.signature && (
                    <small className="text-danger mt-10">
                      {errors.signature[0]}
                    </small>
                  )}
                </>
              )}

              {/* Declaration */}
              {submittedTopics?.[topic] !== true && (
                <>
                  <div className="form-check mt-4">
                    <input
                      type="checkbox"
                      id="declaration"
                      className="form-check-input"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                    />
                    <label htmlFor="declaration" className="form-check-label">
                      I declare that I have completed this quiz honestly and
                      without assistance.
                    </label>
                  </div>
                  {errors.declaration && (
                    <small className="text-danger mt-10">
                      {errors.declaration[0]}
                    </small>
                  )}
                </>
              )}

              {/* Submit button */}
              {submittedTopics?.[topic] !== true && (
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
