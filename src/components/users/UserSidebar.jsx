import { useLocation, useNavigate } from "react-router-dom";

export default function UserSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

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
              onClick={() => navigate("/user/dashboard")}
              style={{ cursor: "pointer" }}
            >
              <span>
                <i className="ri-grid-fill" />
              </span>
              <span className="nav-text">Dashboard</span>
            </a>
          </li>

          <li className={isActive("/user/dashboard/questions") ? "active" : ""}>
            <a
              onClick={() => navigate("/user/dashboard/questions")}
              style={{ cursor: "pointer" }}
            >
              <span>
                <i className="ri-book-fill" />
              </span>
              <span className="nav-text">Questions</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
