import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function RecentUsers() {
  const [users, setUsers] = useState([]);
  const apiBase = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${apiBase}/api/dashboard/recent-users`, {
          credentials: "include",
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        });
        const data = await res.json();

          if (!res.ok) {
            console.error(`Recent Users error: ${data.message}`);
            return;
          }


        setUsers(data);
      } catch (err) {
        console.error(`Recent Users error: ${err.message}`);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="col-lg-6 col-xl-8">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title">Recent Users</h5>
        </div>

        <div className="card-body">
          <div style={{ height: 305, overflow: "auto" }}>
            {users.map((user, i) => (
              <div
                key={i}
                className="student-query-inner d-flex justify-content-between align-items-start mb-3"
              >
                <img
                  className="me-20 rounded-circle"
                  src={user.avatar || "images/avatar/default.png"}
                  alt=""
                  width={50}
                />

                <div className="student-query-details flex-grow-1 me-20">
                  <h6 className="mb-5">{user.name}</h6>
                  <p>{user.email}</p>
                </div>

                <div className="d-flex flex-wrap justify-content-end">
                  {user.status === "pending" ? (
                    <>
                      <button
                        className="icon mx-2 py-2 px-2 rounded-circle bg-primary-lighten"
                        onClick={() => handleApprove(user.id)}
                      >
                        <i className="ri-check-line fs-18 text-primary" />
                      </button>

                      <button
                        className="icon mx-2 py-2 px-2 rounded-circle bg-danger-lighten"
                        onClick={() => handleReject(user.id)}
                      >
                        <i className="ri-close-line fs-18 text-danger" />
                      </button>
                    </>
                  ) : (
                    <span className="text-success">Verified</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  async function handleApprove(id) {
    await fetch(`${apiBase}/users/${id}/approve`, { method: "POST" });
    refresh();
  }

  async function handleReject(id) {
    await fetch(`${apiBase}/users/${id}/reject`, { method: "POST" });
    refresh();
  }

  async function refresh() {
    const res = await fetch(`${apiBase}/dashboard/recent-users`);
    const data = await res.json();
    setUsers(data);
  }
}
