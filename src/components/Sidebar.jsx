export default function Sidebar() {
  return (
    <>
      <div className="sidebar">
        <div className="brand-logo text-center">
          <a className="mini-logo" href="index.html">
            <img src="/assets/images/logo.png" alt="" width={30} />
          </a>
        </div>
        <div className="menu">
          <ul>
            <li className="undefined">
              <a href="index.html">
                <span>
                  <i className="ri-grid-fill" />
                </span>
                <span className="nav-text">Dashboard</span>
              </a>
            </li>
            <li className="undefined">
              <a href="courses.html">
                <span>
                  <i className="ri-stack-fill" />
                </span>
                <span className="nav-text">Courses</span>
              </a>
            </li>
            <li className="undefined">
              <a href="wallet.html">
                <span>
                  <i className="ri-wallet-3-fill" />
                </span>
                <span className="nav-text">Wallet</span>
              </a>
            </li>
            <li className="undefined">
              <a href="withdraw.html">
                <span>
                  <i className="ri-hand-coin-fill" />
                </span>
                <span className="nav-text">Withdraw</span>
              </a>
            </li>
            <li className="undefined">
              <a href="upload.html">
                <span>
                  <i className="ri-upload-cloud-2-fill" />
                </span>
                <span className="nav-text">Upload</span>
              </a>
            </li>
            <li className="undefined">
              <a href="leader-board.html">
                <span>
                  <i className="ri-empathize-fill" />
                </span>
                <span className="nav-text">Board</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
