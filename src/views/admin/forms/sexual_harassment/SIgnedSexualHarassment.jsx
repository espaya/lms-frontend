import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MyHeader from "../../../../components/MyHeader";
import Sidebar from "../../../../components/Sidebar";
import Nav from "../../single_user/Nav";
import { Link } from "react-router-dom";
import { PATHS } from "../../../../router";
import { formatDate } from "../../../../utils/DateFormatter";

export default function SIgnedSexualHarassmentForms() {
  const location = useLocation();
  const { username } = useParams();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const apiBase = import.meta.env.VITE_API_URL;

  const { formData, formType, allForms } = location.state || {};
  const fullname = allForms?.application_form?.profile?.full_name;
  const data = allForms?.sexual_harassment;

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
      <title>Sexual Harassment - 1staccess Home Care</title>
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
                        <h4 className="mt-4 mb-3"> Sexual Harassment</h4>
                      </div>
                      <div className="step-content">
                        <div className="row">
                          <div className="col-md-12">
                            <p>
                              Employee Name: <u>{fullname}</u>
                            </p>

                            <p>
                              1st Access Home Care does not tolerate
                              <strong>Sexual Harassment,</strong> as it is a
                              form of gender-based discrimination.
                            </p>
                            <p>
                              <strong>Definition:</strong>
                              <br />
                              Under Title VII of the Civil Rights Act of 1964,
                              any type of discrimination based on an
                              individual’s gender (male / female) is illegal.
                              Sexual harassment is considered to be a form of
                              gender discrimination. According to the Equal
                              Employment Opportunity Commission sexual
                              harassment is “unwelcome sexual advances, request
                              for sexual favors, and other verbal or physical
                              conduct of a sexual nature when submission to the
                              conduct enters into employment decisions and/or
                              the conduct unreasonably interferes with an
                              individual’s work performance or creates an
                              intimidating, hostile, or offensive working
                              environment.”
                            </p>
                            <p>
                              The Agency will not tolerate any form of sexual
                              harassment from any of its employees. The Agency
                              encourages that any behavior which could be
                              construed as sexual harassment be reported
                              immediately to the Supervisor and/or
                              Administrator. There is no need to fear
                              retaliation. Both females and males can be
                              sexually harassed when exposed to unwelcome sexual
                              advances or to a pattern of verbal abuse,
                              threatening, crude, impolite, or unprofessional
                              conduct.
                              <br />
                            </p>
                            <p>
                              ● Quid pro quo sexual harassment is also against
                              company policy.
                              <br />
                              ● The Agency encourages and urges an employee to
                              come forward and discuss any sexual harassment
                              that may have occured with an Administrator.
                              <br />
                              ● Every complaint will be taken seriously and
                              investigated immediately. Investigations will be
                              documented.
                              <br />
                              ● Any employee involved in a sexual harassment
                              complaint will have a full opportunity to give a
                              full account of their recollection of the incident
                              or incidents.
                              <br />
                              ● The incident(s) will be investigated thoroughly
                              and appropriate action will be taken.
                              <br />
                            </p>
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
                    </div>
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
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
