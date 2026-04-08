import { useEffect, useRef } from "react";
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

  const chartRef = useRef(null); // canvas ref
  const chartInstance = useRef(null); // chart instance

  useEffect(() => {
    const fetchGraph = async () => {
      const res = await fetch(`${apiBase}/api/dashboard/graph`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      });

      const data = await res.json();

      // 🔥 DESTROY previous chart if exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // 🔥 CREATE new chart
      chartInstance.current = new Chart(chartRef.current, {
        type: "line",
        data: {
          labels: data.labels,
          datasets: [
            {
              label: "Users Registered",
              data: data.users,
              borderWidth: 2,
              tension: 0.4, // smooth curve
            },
            {
              label: "Quiz Attempts",
              data: data.quizzes,
              borderWidth: 2,
              tension: 0.4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    };

    fetchGraph();

    // 🔥 CLEANUP ON UNMOUNT
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="col-lg-6 col-xxl-7">
      <div id="user-activity" className="card">
        <div className="card-header">
          <h4 className="card-title">System Activity</h4>
        </div>
        <div className="card-body" style={{ height: "300px" }}>
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
    </div>
  );
}
