import ReportButton from "../../components/admin/ReportButton";
import MyHeader from "../../components/MyHeader";
import Sidebar from "../../components/Sidebar";

export default function Reports() {

  return (
    <>
      <title>Reports - 1staccess Home Care</title>

      <div id="main-wrapper">
        <MyHeader />
        <Sidebar />
        <div className="content-body">
          <div className="container">
            <div className="page-title">
              <div className="row align-items-center justify-content-between">
                <div className="col-md-6">
                  <div className="page-title-content">
                    <h3>Reports</h3>
                    <p className="mb-2">Download reports for quizzes</p>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="breadcrumbs">
                    <a href="#">Home </a>
                    <span>
                      <i className="ri-arrow-right-s-line" />
                    </span>
                    <a href="#">Reports</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-10 col-lg-10 mx-auto">
                <div className="card transparent">
                  <div className="card-body">
                    <div className="bg-white py-12 px-12 rounded d-flex mb-20 justify-content-between align-items-center align-items-center shadow-sm">
                      <div className="payout-icon bg-success-lighten text-success">
                        <i className="ri-flag-2-fill" />
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="mb-5">USD 1257</h5>
                        <p className="mb-0">June 9, 2021 09:55 PM </p>
                      </div>
                      <ReportButton/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
