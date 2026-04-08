import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function Notification() {
  const [notifications, setNotifications] = useState([]);
  const apiBase = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchNotifications = async () => {
      const res = await fetch(`${apiBase}/api/dashboard/notifications`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          // "X-XSRF-TOKEN": decodeURIComponent(Cookies.get("XSRF-TOKEN")),
        },
      });
      const data = await res.json();
      setNotifications(data);
    };

    fetchNotifications();
  }, []);

  return (
    <div className="col-lg-6 col-xxl-5">
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Recent Activity</h4>
        </div>

        <div className="card-body">
          <div style={{ height: 275, overflow: "auto" }}>
            {notifications.map((item, i) => (
              <div key={i} className="border-bottom py-2">
                <h6 className="mb-1">{item.title}</h6>
                <span className="text-muted">{item.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}