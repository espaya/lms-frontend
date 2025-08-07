import MyHeader from "../../components/MyHeader";
import Sidebar from "../../components/Sidebar";

export default function AdminDashboard() {
  return (
    <>
      
      <title>Dashboard - 1staccess Home Care</title>
      
      <div id="main-wrapper">
        <MyHeader/>
        <Sidebar/>
        <div className="content-body">
          <div className="container">
            <div className="page-title">
              <div className="row align-items-center justify-content-between">
                <div className="col-md-6">
                  <div className="page-title-content">
                    <h3>Dashboard</h3>
                    <p className="mb-2">Welcome to Edunet Dashboard</p>
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
            {/* Body goes here */}
          </div>
        </div>
      </div>
    </>
  );
}
