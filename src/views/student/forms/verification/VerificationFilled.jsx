import { Link } from "react-router-dom";
import UserHeader from "../../../../components/users/UserHeader";
import UserSidebar from "../../../../components/users/UserSidebar";
import { PATHS } from "../../../../router";
import { formatDate } from "../../../../utils/DateFormatter";

export default function VerificationFilled({ data, fullname }) {
  const apiBase = import.meta.env.VITE_API_URL;

  const printContent = () => {
    var printArea = document.getElementById("printArea");
    var printContents = printArea.innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  };

  return (
    <>
      <title>Verification of Professional License - 1staccess Home Care</title>

      <div className="dashboard">
        <div id="main-wrapper">
          <UserHeader />
          <UserSidebar />

          <div className="content-body">
            <div className="container">
              <div className="page-title">
                <div className="row align-items-center justify-content-between">
                  <div className="col-md-6">
                    <div className="page-title-content">
                      <h3>Verification of Professional License</h3>
                      <p className="mb-2">Fill all required(*) fields</p>
                    </div>
                  </div>
                  <div className="col-auto">
                    <div className="breadcrumbs">
                      <Link to={PATHS.USER_DASHBOARD}>Home</Link>
                      <span>
                        <i className="ri-arrow-right-s-line"></i>
                      </span>
                      <Link to={PATHS.USER_FORMS}>Forms</Link>
                      <span>
                        <i className="ri-arrow-right-s-line"></i>
                      </span>
                      <Link to={PATHS.USER_UNIVERSAL_PRECAUTIONS_FORM}>
                        Verification of Professional License
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div id="printArea" className="card-body">
                      <div style={{ textAlign: "center" }}>
                        <img
                          src="/assets/images/main_logo.png"
                          width={200}
                          alt="Company Logo"
                        />
                        <h5 className="mt-10">
                          1st Access Home Care Incorporated
                        </h5>
                        <p>
                          6600 Fieldtan Trail, Moseley, VA, 23120 <br />
                          Agency Phone: (+1) 804-818-3216
                        </p>
                        <h5 className="mt-4 mb-3">
                          Verification of Professional License
                        </h5>
                      </div>
                      <div className="step-content">
                        <div className="row">
                          <div className="col-md-12">
                            <p>
                              Employee Name: <b> {fullname ?? 'N/A'} </b>
                            </p>
                            <p>
                              {" "}
                              Check Off Discipline Needing Verification:{" "}
                              <b>{data.disciplines}</b>{" "}
                            </p>
                            <p>
                              {" "}
                              License Number: <b>{data.licenseNumber}</b>
                            </p>
                            <p>
                              Expiration Date Of License:{" "}
                              <b>{data.expirationDate}</b>
                            </p>
                            <p>
                              {" "}
                              Date Verified: <b>{data.dateVerified}</b>
                            </p>
                            <p>
                              {" "}
                              License Verified By:{" "}
                              <b>{data.licenseVerifiedBy}</b>
                            </p>
                            <p>
                              {" "}
                              Action Outstanding:{" "}
                              <b>{data.actionOutstanding}</b>
                            </p>
                            <p>
                              {" "}
                              Comments: <b>comments</b>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 mt-20">
                          <p>Signature:</p>
                          {data?.signature ? (
                            <img
                              src={`${apiBase}/storage/signature/${data.signature}`}
                              alt="Signature"
                              style={{ width: "300px" }}
                            />
                          ) : (
                            <p>
                              <em>No signature provided</em>
                            </p>
                          )}
                        </div>
                        <div className="col-md-6 mt-50">
                          <p>Date Signed: </p>
                          <p>{formatDate(data?.created_at)}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3 mt-20">
                      <button
                        onClick={printContent}
                        className="btn btn-primary btn-lg"
                      >
                        Print
                      </button>
                      <Link
                        to={PATHS.USER_FORMS}
                        style={{ marginLeft: "10px" }}
                        className="btn btn-info btn-lg"
                      >
                        Back
                      </Link>
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
