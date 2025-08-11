import { PATHS } from "../router";
import { useLocation, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  // helper to check if a path matches the current URL
  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar">
      <div className="brand-logo text-center">
        <a
          className="mini-logo"
          onClick={() => navigate(PATHS.ADMIN_DASHBOARD)}
          style={{ cursor: "pointer" }}
        >
          <img src="/assets/images/favicon.png" alt="" width={30} />
        </a>
      </div>
      <div className="menu">
        <ul>
          <li className={isActive(PATHS.ADMIN_DASHBOARD) ? "active" : ""}>
            <a
              onClick={() => navigate(PATHS.ADMIN_DASHBOARD)}
              style={{ cursor: "pointer" }}
            >
              <span>
                <i className="ri-grid-fill" />
              </span>
              <span className="nav-text">Dashboard</span>
            </a>
          </li>

          <li
            className={`nav-item dropdown ${
              isActive(PATHS.ALL_QUESTIONS) || isActive(PATHS.QUESTION_MANAGER)
                ? "active"
                : ""
            }`}
          >
            <a
              href="#"
              className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span>
                <i className="ri-stack-fill" />
              </span>
              <span className="nav-text">Question Manager</span>
            </a>
            <ul
              className="dropdown-menu dark-dropdown"
              style={{ color: "black" }}
            >
              <li className={isActive(PATHS.ALL_QUESTIONS) ? "active" : ""}>
                <a
                  className="dropdown-item"
                  onClick={() => navigate(PATHS.ALL_QUESTIONS)}
                  style={{ cursor: "pointer" }}
                >
                  All Questions
                </a>
              </li>

              <li className={isActive(PATHS.QUESTION_MANAGER) ? "active" : ""}>
                <a
                  className="dropdown-item"
                  onClick={() => navigate(PATHS.QUESTION_MANAGER)}
                  style={{ cursor: "pointer" }}
                >
                  Upload New
                </a>
              </li>
            </ul>
          </li>

          <li
            className={`nav-item dropdown ${
              isActive(PATHS.ADMIN_USERS) || isActive(PATHS.ADD_USERS)
                ? "active"
                : ""
            }`}
          >
            <a
              href="#"
              className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span>
                <i className="ri-group-fill" />
              </span>
              <span className="nav-text">Manage Users</span>
            </a>
            <ul
              className="dropdown-menu dark-dropdown"
              style={{ color: "black" }}
            >
              <li className={isActive(PATHS.ADMIN_USERS) ? "active" : ""}>
                <a
                  className="dropdown-item"
                  onClick={() => navigate(PATHS.ADMIN_USERS)}
                  style={{ cursor: "pointer" }}
                >
                  All Users
                </a>
              </li>

              <li className={isActive(PATHS.ADD_USERS) ? "active" : ""}>
                <a
                  className="dropdown-item"
                  onClick={() => navigate(PATHS.ADD_USERS)}
                  style={{ cursor: "pointer" }}
                >
                  Add New
                </a>
              </li>
            </ul>
          </li>

          <li className={isActive(PATHS.REPORTS) ? "active" : ""}>
            <a
              onClick={() => navigate(PATHS.REPORTS)}
              style={{ cursor: "pointer" }}
            >
              <span>
                <i className="ri-flag-2-fill" />
              </span>
              <span className="nav-text">Reports</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
