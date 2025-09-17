import UserHeader from "../../../../components/users/UserHeader";
import UserSidebar from "../../../../components/users/UserSidebar";
import { Link } from "react-router-dom";
import { PATHS } from "../../../../router";

export default function DisclosureFilled({ data, position, fullname }) {
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
      <title>Sworn Disclosure Statement - 1staccess Home Care</title>

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
                      <h3>Sworn Disclosure Statement</h3>
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
                      <Link to={PATHS.USER_DISCLOSURE_FORM}>
                        Sworn Disclosure Statemen
                      </Link>
                      <a href="#">Leader Board</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="card ">
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
                        <h4 className="mt-4 mb-3">
                          Sworn Disclosure Statement
                        </h4>
                      </div>
                      <div className="step-content">
                        <h4 className="step-title">PREAMBLE</h4>
                        <div className="row">
                          <div className="col-12">
                            <p>
                              Employee Name: <u> {fullname} </u>
                            </p>

                            <p>
                              Section 32.1-162.9:1 of the Code of Virginia
                              requires that a sworn disclosure statement or
                              affirmation be completed for each prospective
                              employee for a home care organization. Employment
                              or volunteering is prohibited if a person has been
                              convicted of any of the offenses specified on the
                              reverse side or has been the subject of a founded
                              complaint of child abuse or neglect. Convictions
                              include adult convictions and juvenile convictions
                              and adjudications of delinquency based on an
                              offense that would have been at the time of
                              conviction a felony, conviction if committed by an
                              adult within or outside the commonwealth. Any
                              person making a materially false statement
                              regarding any such offense shall be guilty of a
                              Class 1 misdemeanor. This statement must be
                              provided to and maintained at the exempt facility
                              for prospective employees and volunteers.
                            </p>
                          </div>
                        </div>
                        <div className="step-actions mt-2-">
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={nextStep}
                          >
                            Next
                          </button>
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
