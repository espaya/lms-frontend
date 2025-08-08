import { PATHS } from "../router";

export default function Sidebar() {
  return (
    <>
      <div className="sidebar">
        <div className="brand-logo text-center">
          <a className="mini-logo" href="#">
            <img src="/assets/images/logo.png" alt="" width={30} />
          </a>
        </div>
        <div className="menu">
          <ul>
            <li className="undefined">
              <a href={PATHS.ADMIN_DASHBOARD}>
                <span>
                  <i className="ri-grid-fill" />
                </span>
                <span className="nav-text">Dashboard</span>
              </a>
            </li>

            <li className="nav-item dropdown">
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
                <li>
                  <a className="dropdown-item" href={PATHS.ALL_QUESTIONS}>
                    All Questions
                  </a>
                </li>

                <li>
                  <a className="dropdown-item" href={PATHS.QUESTION_MANAGER}>
                    Upload New
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
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
                <li>
                  <a className="dropdown-item" href={PATHS.ADMIN_USERS}>
                    All Users
                  </a>
                </li>

                <li>
                  <a className="dropdown-item" href={PATHS.ADD_USERS}>
                    Add New
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
