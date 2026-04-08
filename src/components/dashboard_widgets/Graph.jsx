import { useEffect } from "react";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from "chart.js";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
);

export default function Graph() {
  const apiBase = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchGraph = async () => {
      const res = await fetch(`${apiBase}/dashboard/graph`);
      const data = await res.json();

      new Chart(document.getElementById("EarningGraph"), {
        type: "line",
        data: {
          labels: data.labels,
          datasets: [
            {
              label: "Users Registered",
              data: data.users,
            },
            {
              label: "Quiz Attempts",
              data: data.quizzes,
            },
          ],
        },
      });
    };

    fetchGraph();
  }, []);

  return (
    <div className="col-lg-6 col-xxl-7">
      <div id="user-activity" className="card">
        <div className="card-header">
          <h4 className="card-title">System Activity</h4>
        </div>
        <div className="card-body">
          <canvas id="EarningGraph" height={280}></canvas>
        </div>
      </div>
    </div>
  );
}
