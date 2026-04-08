import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function TotalUsers() {
  const [users, setUsers] = useState({
    total: 0,
    active: 0,
    inactive: 0,
  });

  const apiBase = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${apiBase}/api/dashboard/users`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
            // "X-XSRF-TOKEN": decodeURIComponent(Cookies.get("XSRF-TOKEN")),
          },
          credentials: "include",
        });
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="col-lg-4 col-sm-12">
      <div className="color-widget stat-widget p-20 mb-160 mb-30">
        <div className="d-flex align-items-center mb-20">
          <span className="icon">
            <i className="ri-team-line text-primary bg-primary-lighten fs-30 py-12 px-12 rounded me-20" />
          </span>
          <div>
            <p className="mb-0">
              <strong>Total Users</strong>
            </p>
            <h3 className="mb-0">{users.total}</h3>
          </div>
        </div>

        <p className="mb-7">
          <strong>Active: {users.active}</strong>
        </p>
        <p>
          <strong>Inactive: {users.inactive}</strong>
        </p>

        <div className="progress">
          <div
            className="progress-bar bg-primary"
            style={{ width: `${(users.active / users.total) * 100 || 0}%` }}
          />
        </div>
      </div>
    </div>
  );
}
