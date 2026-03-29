import Graph from "../../components/dashboard_widgets/Graph";
import Notification from "../../components/dashboard_widgets/Notifications";
import QuickQctions from "../../components/dashboard_widgets/QuickActions";
import RecentUsers from "../../components/dashboard_widgets/RecentUsers";
import TopUsers from "../../components/dashboard_widgets/TopUsers";
import TotalFormsSigned from "../../components/dashboard_widgets/TotalFormsSigned";
import TotalQuiz from "../../components/dashboard_widgets/TotalQuiz";
import TotalUsers from "../../components/dashboard_widgets/TotalUsers";
import UsersLocation from "../../components/dashboard_widgets/UsersLocation";
import MyHeader from "../../components/MyHeader";
import Sidebar from "../../components/Sidebar";

export default function AdminDashboard() {
  return (
    <>
      <title>Dashboard - 1staccess Home Care</title>
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="assets/images/favicon.png"
      />

      <div id="main-wrapper">
        <MyHeader />
        <Sidebar />
        <div className="content-body">
          <div className="container">
            <div className="page-title">
              <div className="row align-items-center justify-content-between">
                <div className="col-md-6">
                  <div className="page-title-content">
                    <h3>Dashboard</h3>
                    <p className="mb-2">Welcome to 1staccess LMS Dashboard</p>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="breadcrumbs">
                    <a href="#">
                      Home
                      {/* */}
                    </a>
                    <span>
                      <i className="ri-arrow-right-s-line" />
                    </span>
                    <a href="#">Dashboard</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <TotalUsers />
              <TotalQuiz />
              <TotalFormsSigned />
              <Graph />
              <Notification />

              <div className="col-lg-6 col-xl-4 ">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Total Sales</h4>
                  </div>
                  <div className="card-body">
                    <div className="chartjs-size-monitor">
                      <div className="chartjs-size-monitor-expand">
                        <div className="" />
                      </div>
                      <div className="chartjs-size-monitor-shrink">
                        <div className="" />
                      </div>
                    </div>
                    <canvas
                      id="TotalSales"
                      height={305}
                      style={{ display: "block", width: 410, height: 305 }}
                      width={410}
                      className="chartjs-render-monitor"
                    />
                  </div>
                </div>
              </div>
              <RecentUsers />
              <QuickQctions />
              <UsersLocation />
              <TopUsers />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
