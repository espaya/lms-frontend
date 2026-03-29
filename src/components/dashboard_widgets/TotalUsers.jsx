import { useState } from "react";

export default function TotalUsers() {
  const [users, setUsers] = useState({});
  const apiBase = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(false);

  // const 

  return (
    <>
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
              <h3 className="mb-0">5220</h3>
            </div>
          </div>
          <p className="mb-7">
            <strong>
              Free:
              {/* */}4240 students
            </strong>
          </p>
          <p>
            <strong>
              Paid:
              {/* */}980 Students
            </strong>
          </p>
          <div className="progress">
            <div
              className="progress-bar bg-primary"
              style={{ width: "75%" }}
              role="progressbar"
              aria-valuenow={75}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>
      </div>
    </>
  );
}
