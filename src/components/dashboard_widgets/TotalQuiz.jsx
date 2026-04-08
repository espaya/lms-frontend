import { useEffect, useState } from "react";

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
        const res = await fetch(`${apiBase}/dashboard/quizzes`);
        const data = await res.json();
        setQuiz(data);
      } catch (err) {
        console.error(err);
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
            <p className="mb-0"><strong>Total Quiz</strong></p>
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