import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function QuickQctions() {
  const [data, setData] = useState({
    totalUsers: 0,
    newUsersToday: 0,
    pendingVerifications: 0,
    pendingRequests: 0,
    reports: 0,
  });

  const apiBase = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${apiBase}/api/dashboard/quick-actions`, {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
            // "X-XSRF-TOKEN": decodeURIComponent(Cookies.get("XSRF-TOKEN")),
          },
        });
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="col-lg-6 col-xl-3">
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Quick Actions</h4>
        </div>

        <div className="card-body">
          <div className="total-balance">
            <p>Total Users</p>
            <h2>{data.totalUsers}</h2>
          </div>

          <div className="row">
            <div className="col-lg-6 col-xl-12">
              <div className="balance-stats d-flex justify-content-between align-items-center active">
                <div>
                  <p>New Users Today</p>
                  <h3>{data.newUsersToday}</h3>
                </div>
                <span>
                  <i className="ri-arrow-right-line" />
                </span>
              </div>
            </div>

            <div className="col-lg-6 col-xl-12">
              <div className="balance-stats d-flex justify-content-between align-items-center">
                <div>
                  <p>Pending Verification</p>
                  <h3>{data.pendingVerifications}</h3>
                </div>
                <span>
                  <i className="ri-arrow-right-line" />
                </span>
              </div>
            </div>

            <div className="col-lg-6 col-xl-12">
              <div className="balance-stats d-flex justify-content-between align-items-center">
                <div>
                  <p>Delete Requests</p>
                  <h3>{data.pendingRequests}</h3>
                </div>
                <span>
                  <i className="ri-arrow-right-line" />
                </span>
              </div>
            </div>

            <div className="col-lg-6 col-xl-12">
              <div className="balance-stats d-flex justify-content-between align-items-center">
                <div>
                  <p>Reports</p>
                  <h3>{data.reports}</h3>
                </div>
                <span>
                  <i className="ri-arrow-right-line" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
