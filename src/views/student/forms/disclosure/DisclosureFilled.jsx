import UserHeader from "../../../../components/users/UserHeader";
import UserSidebar from "../../../../components/users/UserSidebar";
import { Link } from "react-router-dom";
import { PATHS } from "../../../../router";
import { formatDate } from "../../../../utils/DateFormatter";

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
                            <p>
                              Mailing Address: <b>{data.mailing_address}</b>
                            </p>
                            <p>
                              Position Applied For: <b> {position} </b>{" "}
                            </p>
                            <p>
                              1. Have you ever been convicted of or are you the
                              subject of pending charges for any of the
                              following offenses: murder; malicious wounding by
                              mob; abduction; abduction for immoral purposes;
                              assault and bodily wounding; robbery; carjacking;
                              extortion by threat; any felony stalking
                              violation; sexual assault; arson; burglary; any
                              felony violation relating to possession or
                              distribution of drugs; drive by shooting; use of a
                              machine gun in a crime of violence; aggressive use
                              of a machine gun; use of a sawed-off shotgun in a
                              crime of violence; pandering; crimes against
                              nature involving children; incest; taking indecent
                              liberties with children; abuse and neglect of
                              children, including failing to secure medical
                              attention for an injured child; obscenity
                              offenses; possession of child pornography;
                              electronic facilitation of pornography; abuse and
                              neglect of incapacitated adults; employing or
                              permitting a minor to assist in an act
                              constituting an obscenity or related offence;
                              delivery of drugs to prisoners; escape from jail;
                              felonies by prisoners; within the Commonwealth or
                              any equivalent offense outside the Commonwealth?{" "}
                              <b> {data.convicted_outside_commonwealth} </b>
                            </p>

                            {data.outside_commonwealth_specify ===
                              "Yes (Convicted)" ||
                            data.outside_commonwealth_specify ===
                              "Yes (Pending)" ? (
                              <p>
                                If Yes Specify Crimes:
                                <b> {data.outside_commonwealth_specify} </b>
                              </p>
                            ) : (
                              <p></p>
                            )}

                            <p>
                              2. Have you been convicted of or are you the
                              subject of a pending charge for any other felony
                              in the five(5) years prior to the date of
                              employment or volunteering?{" "}
                              <b>{data.convicted_pending}</b>
                            </p>

                            {data.convicted_pending_specify ===
                              "Yes (Convicted)" ||
                            data.convicted_pending_specify ===
                              "Yes (Pending)" ? (
                              <p>
                                If Yes Specify Crimes:
                                <b> {data.convicted_pending_specify} </b>
                              </p>
                            ) : (
                              <p></p>
                            )}

                            <p>
                              3. Have you ever been the subject of a founded
                              complaint of child abuse or neglect within or
                              outside the Commonwealth?{" "}
                              <b> {data.child_abuse} </b>
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6 mt-20">
                            <p>Witness Signature:</p>
                            {data?.wit_signature ? (
                              <img
                                src={`${apiBase}/storage/signature/${data.wit_signature}`}
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
                          <div className="col-md-6 mt-20">
                            <p>Applicant Signature:</p>
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
