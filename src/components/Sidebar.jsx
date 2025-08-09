import { PATHS } from "../router";
import { useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  // helper to check if a path matches the current URL
  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar">
      <div className="brand-logo text-center">
        <a className="mini-logo" href="#">
          <img src="/assets/images/favicon.png" alt="" width={30} />
        </a>
      </div>
      <div className="menu">
        <ul>
          <li className={isActive(PATHS.ADMIN_DASHBOARD) ? "active" : ""}>
            <a href={PATHS.ADMIN_DASHBOARD}>
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
                <a className="dropdown-item" href={PATHS.ALL_QUESTIONS}>
                  All Questions
                </a>
              </li>

              <li className={isActive(PATHS.QUESTION_MANAGER) ? "active" : ""}>
                <a className="dropdown-item" href={PATHS.QUESTION_MANAGER}>
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
                <a className="dropdown-item" href={PATHS.ADMIN_USERS}>
                  All Users
                </a>
              </li>

              <li className={isActive(PATHS.ADD_USERS) ? "active" : ""}>
                <a className="dropdown-item" href={PATHS.ADD_USERS}>
                  Add New
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}
