import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function TotalQuiz() {
  const [quiz, setQuiz] = useState({
    total: 0,
    attempts: 0,
    passed: 0,
  });

  const apiBase = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await fetch(`${apiBase}/api/dashboard/quizzes`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        });
        const data = await res.json();
        if (!res.ok) {
          console.error(`Total Quiz error: ${data.message}`);
          return;
        }
        setQuiz(data);
      } catch (err) {
        console.error(`Total Quiz error: ${err.message}`);
      }
    };

    fetchQuiz();
  }, []);

  return (
    <div className="col-lg-4 col-sm-12">
      <div className="stat-widget p-20 mb-160 mb-30">
        <div className="d-flex align-items-center mb-20">
          <span className="icon">
            <i className="ri-add-circle-line text-warning bg-warning-lighten fs-30 py-12 px-12 rounded me-20" />
          </span>
          <div>
            <p className="mb-0">
              <strong>Total Quiz</strong>
            </p>
            <h3 className="mb-0">{quiz.total}</h3>
          </div>
        </div>

        <p className="mb-7">
          <strong>Attempts: {quiz.attempts}</strong>
        </p>
        <p>
          <strong>Passed: {quiz.passed}</strong>
        </p>

        <div className="progress">
          <div
            className="progress-bar bg-warning"
            style={{ width: `${(quiz.passed / quiz.attempts) * 100 || 0}%` }}
          />
        </div>
      </div>
    </div>
  );
}
