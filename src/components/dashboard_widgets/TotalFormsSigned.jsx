import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function TotalFormsSigned() {
  const [forms, setForms] = useState({
    total: 0,
    completed: 0,
    pending: 0,
  });

  const apiBase = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const res = await fetch(`${apiBase}/api/dashboard/forms`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        });
        
        const data = await res.json();
        
        if (!res.ok) {
          console.error(`Total Forms Signed error: ${data.message}`);
          return;
        }

        setForms(data);
      } catch (err) {
        console.error(`Total Forms Signed error: ${err.message}`);
      }
    };

    fetchForms();
  }, []);

  return (
    <div className="col-lg-4 col-sm-12">
      <div className="stat-widget p-20 mb-160 mb-30">
        <div className="d-flex align-items-center mb-20">
          <span className="icon">
            <i className="ri-stack-line text-danger bg-danger-lighten fs-30 py-12 px-12 rounded me-20" />
          </span>
          <div>
            <p className="mb-0">
              <strong>Forms Signed</strong>
            </p>
            <h3 className="mb-0">{forms.total}</h3>
          </div>
        </div>

        <p className="mb-7">
          <strong>Completed: {forms.completed}</strong>
        </p>
        <p>
          <strong>Pending: {forms.pending}</strong>
        </p>

        <div className="progress">
          <div
            className="progress-bar bg-danger"
            style={{ width: `${(forms.completed / forms.total) * 100 || 0}%` }}
          />
        </div>
      </div>
    </div>
  );
}
