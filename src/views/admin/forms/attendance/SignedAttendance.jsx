import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MyHeader from "../../../../components/MyHeader";
import Sidebar from "../../../../components/Sidebar";
import Nav from "../../single_user/Nav";
import { Link } from "react-router-dom";
import { PATHS } from "../../../../router";
import Spinner from "../../../../components/Spinner";
import { formatDate } from "../../../../utils/DateFormatter";

export default function SignedAttendanceForms() {
  const location = useLocation();
  const { username } = useParams();
  const [loading, setLoading] = useState(false);
  const apiBase = import.meta.env.VITE_API_URL;

  const printContent = () => {
    var printArea = document.getElementById("printArea");
    var printContents = printArea.innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  };

  const { formData, formType, allForms } = location.state || {};
  const fullname = allForms?.application_form?.profile?.full_name;
  const data = allForms.attendance_tardiness;

  return (
    <>
      <title>
        Employee Notification of Policy: Attendance, Tardiness, Absenteeism and
        Leave - 1staccess Home Care
      </title>
      <div id="main-wrapper">
        <MyHeader />
        <Sidebar />
        <div className="content-body">
          <div className="container">
            <div className="page-title">
              <div className="row align-items-center justify-content-between">
                <div className="col-md-6">
                  <div className="page-title-content">
                    <h3>{username}</h3>
                    <p className="mb-2">Manage all forms signed by user</p>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="breadcrumbs">
                    <a href="#">Profile </a>
                    <span>
                      <i className="ri-arrow-right-s-line"></i>
                    </span>
                    <a href="#">Forms</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <Nav username={username} />
              {loading ? (
                <Spinner />
              ) : (
                <div className="col-md-9">
                  <div className="card">
                    <div id="printArea" className="card-body">
                      {/* Header */}
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
                          Employee Notification of Policy: Attendance,
                          Tardiness, Absenteeism and Leave
                        </h4>
                      </div>
                      <div className="col-12">
                        <p>
                          Employee Name: <u>{fullname ?? 'N/A'} </u>
                        </p>
                        <br />
                        <p>
                          Exempt employees are owners, officers, management and
                          supervisors. All full time employees are required to
                          put in a full day's work and a full 40 hour work week.
                          All employees regardless of classification, are
                          required to arrive on time and appropriately complete
                          their designated hours and tasks as assigned.
                        </p>
                      </div>
                      <div className="col-12 mt-20">
                        <h5>ATTENDANCE:</h5>
                        <ul>
                          <li>
                            1. The employee must notify the Supervisor in all
                            events of tardiness. If the office is closed, call
                            the answering service to have on-call Supervisor
                            paged and relay information to him or her. Only 3
                            tardiness in a calendar month will be accepted
                            unless very extenuating circumstances are present
                            and approved by the Supervisor. More than 3
                            tardiness within a given month may result in
                            counselling with Supervisor and every effort made to
                            avoid further tardiness. A copy of counselling will
                            be placed in the personnel file. Two consecutive
                            months of written warnings for excessive tardiness
                            may result in dismissal or termination
                          </li>
                          <li>
                            2. No show/no call situations are not tolerated and
                            may result in termination.
                          </li>
                          <li>
                            3. Perfect attendance throughout the year may be
                            rewarded at year - end at the discretion of
                            supervisor and/or administrator.
                          </li>
                        </ul>
                      </div>
                      <div className="col-12 mt-20">
                        <h5>ABSENTEEISM:</h5>
                        <ul>
                          <li>
                            1. Employees are required to inform the Supervisor
                            as soon as possible when absenteeism is known, to
                            allow the Agency time to cover assignments. The
                            employee is not excused from work until the
                            Supervisor approves the absence or verified he/she
                            is aware.
                          </li>
                          <li>
                            2. Illness and or injury that requires a physician's
                            treatment and that may take more than a day for
                            recovery will need to be called in and discussed
                            with the Supervisor. When the office is closed,
                            request the answering service to contact the person
                            on call with the information and give your phone
                            number for follow-up.
                          </li>
                          <li>
                            3. If an employee needs to be absent for reasons
                            other than illness, he/she must submit a Leave
                            Request Form at least 14 days prior to time
                            requested.
                          </li>
                          <li>
                            4. More than 3 consecutive days of absenteeism
                            requires a physician's note for illness or injury
                            sustained. Medically verified illness may be
                            excused. Failure to provide proper notice will
                            result in counselling and a written warning will be
                            placed in the personnel file.
                          </li>
                          <li>
                            5. Excessive absenteeism without just cause or
                            physician's excuse is reason for dismissal.
                          </li>
                          <li>
                            6.{" "}
                            <strong>
                              No shows / no calls are not tolerated.
                            </strong>{" "}
                            The need to follow policy and procedure is a
                            courtesy to other employees. Disciplinary action may
                            be supervised in an effort to avoid any further
                            complications.
                          </li>
                          <li>
                            7. Notice to your Supervisor in writing for
                            consideration on a requested leave of absence must
                            be submitted at least 14 days to leave, unless there
                            is a cause of emergency or illness.
                          </li>
                        </ul>
                        <br />
                        <p>
                          <strong>I</strong> acknowledge that I have been
                          oriented to the Agency's policy regarding{" "}
                          <strong>ATTENDANCE</strong> and{" "}
                          <strong>ABSENTEEISM,</strong> and I agree to follow
                          all guidelines, both written and verbal. I understand
                          that, if the guidelines, policies and procedures are
                          not followed, that I may be immediately terminated. I
                          also had the opportunity to ask questions regarding
                          this policy and I know where it's located for future
                          reference.
                        </p>
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
                        <div className="col-md-6 mt-10">
                          <p>Date Signed: </p>
                          <p>{formatDate(data?.created_at)}</p>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-20">
                      <div className="col-md-3 mt-20">
                        <button
                          onClick={printContent}
                          className="btn btn-primary btn-lg"
                        >
                          Print
                        </button>
                        <Link
                          onClick={() => window.history.back()}
                          style={{ marginLeft: "10px" }}
                          className="btn btn-info btn-lg"
                        >
                          Back
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
