export default function Sidebar() {
  return (
    <>
      <div className="sidebar">
        <div className="brand-logo text-center">
          <a className="mini-logo" href="/admin/dashboard">
            <img src="/assets/images/logo.png" alt="" width={30} />
          </a>
        </div>
        <div className="menu">
          <ul>
            <li className="undefined">
              <a href="/admin/dashboard">
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
              <ul className="dropdown-menu dark-dropdown">
                <li>
                  <a
                    className="dropdown-item"
                    href="/admin/dashboard/all-questions"
                  >
                    All Questions
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="/admin/dashboard/question-manager"
                  >
                    Upload New
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
