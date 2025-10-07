import { useLocation, useNavigate } from "react-router-dom";
import { PATHS } from "../../router";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function UserSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(false);
  const apiBase = import.meta.env.VITE_API_URL;
  const [errors, setErrors] = useState({});

  const isActive = (path) => location.pathname === path;



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
                navigate("/user/dashboard");
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
                navigate(PATHS.USER_QUESTION);
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
                navigate(PATHS.USER_FORMS);
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
