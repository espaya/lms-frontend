import { useLocation } from "react-router-dom";

export default function UserSidebar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar">
      <div className="brand-logo text-center">
        <a className="mini-logo" href="">
          <img src="/assets/images/favicon.png" alt="" width={30} />
        </a>
      </div>
      <div className="menu">
        <ul>
          <li className={isActive("/user/dashboard") ? "active" : ""}>
            <a href="/user/dashboard">
              <span>
                <i className="ri-grid-fill" />
              </span>
              <span className="nav-text">Dashboard</span>
            </a>
          </li>

          <li className={isActive("/user/dashboard/questions") ? "active" : ""}>
            <a href="/user/dashboard/questions">
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
