import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function TopUsers() {
  const [users, setUsers] = useState([]);
  const apiBase = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        const res = await fetch(`${apiBase}/api/dashboard/top-users`, {
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

    fetchTopUsers();
  }, []);

  return (
    <div className="col-xl-12">
      <div className="card transparent">
        <div className="card-header">
          <h4 className="card-title">Top Users</h4>
        </div>

        <div className="card-body">
          <div className="rtable rtable--5cols rtable--collapse">
            {/* HEADER */}
            <div className="rtable-row rtable-row--head bg-transparent">
              <div className="rtable-cell topic-cell column-heading text-dark">
                <strong>User</strong>
              </div>
              <div className="rtable-cell traffic-cell column-heading text-dark">
                <strong>Quiz Attempts</strong>
              </div>
              <div className="rtable-cell source-cell column-heading text-dark">
                <strong>Passed</strong>
              </div>
              <div className="rtable-cell referrals-cell column-heading text-dark">
                <strong>Forms Completed</strong>
              </div>
              <div className="rtable-cell trend-cell column-heading text-dark">
                <strong>Score</strong>
              </div>
            </div>

            {/* DATA */}
            {users.map((user, i) => (
              <div className="rtable-row" key={i}>
                <div className="rtable-cell topic-cell">
                  <div className="rtable-cell--content title-content d-flex align-items-center">
                    <img
                      className="topic-cell-img"
                      src={user.avatar || "images/avatar/default.png"}
                      width={95}
                      alt=""
                    />
                    <div className="topic-cell-span">
                      <h5>{user.name}</h5>
                      <p>{user.email}</p>
                    </div>
                  </div>
                </div>

                <div className="rtable-cell traffic-cell">
                  <div className="rtable-cell--content date-content">
                    {user.attempts}
                  </div>
                </div>

                <div className="rtable-cell source-cell">
                  <div className="rtable-cell--content access-link-content">
                    {user.passed}
                  </div>
                </div>

                <div className="rtable-cell referrals-cell">
                  <div className="rtable-cell--content replay-link-content">
                    {user.formsCompleted}
                  </div>
                </div>

                <div className="rtable-cell trend-cell">
                  <div className="rtable-cell--content replay-link-content">
                    {user.score}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
