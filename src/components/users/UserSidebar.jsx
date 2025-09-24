import { useLocation, useNavigate } from "react-router-dom";
import { PATHS } from "../../router";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import fetchApplicationForms from "../../controller/user/forms/EmploymentApplication";

export default function UserSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(false);
  const apiBase = import.meta.env.VITE_API_URL;
  const [errors, setErrors] = useState({});

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    fetchApplicationForms(setDocument, setLoading, apiBase, setErrors);
  }, []);

  const isSigned = document?.employmentAplication || document?.profileData;
  const applicationForms = () => navigate(PATHS.USER_APPLICATION_FORM);

  return (
    <div className="sidebar">
      <div className="brand-logo text-center">
        <a
          className="mini-logo"
          onClick={() => navigate("/user/dashboard")}
          style={{ cursor: "pointer" }}
        >
          <img src="/assets/images/favicon.png" alt="" width={30} />
        </a>
      </div>
      <div className="menu">
        <ul>
          <li className={isActive("/user/dashboard") ? "active" : ""}>
            <a
              onClick={() => {
                if (isSigned) {
                  navigate("/user/dashboard");
                } else {
                  applicationForms(); // <-- now it runs only on click
                }
              }}
              style={{ cursor: "pointer" }}
            >
              <span>
                <i className="ri-grid-fill" />
              </span>
              <span className="nav-text">Dashboard</span>
            </a>
          </li>

          <li className={isActive(PATHS.USER_QUESTION) ? "active" : ""}>
            <a
              onClick={() => {
                if (isSigned) {
                  navigate(PATHS.USER_QUESTION);
                } else {
                  applicationForms();
                }
              }}
              style={{ cursor: "pointer" }}
            >
              <span>
                <i className="ri-book-fill" />
              </span>
              <span className="nav-text">Questions</span>
            </a>
          </li>

          <li className={isActive(PATHS.USER_FORMS) ? "active" : ""}>
            <a
              onClick={() => {
                if (isSigned) {
                  navigate(PATHS.USER_FORMS);
                } else {
                  applicationForms();
                }
              }}
              style={{ cursor: "pointer" }}
            >
              <span>
                <i className="ri-file-list-3-fill" />
              </span>
              <span className="nav-text">Forms</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
