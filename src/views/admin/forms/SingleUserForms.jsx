import MyHeader from "../../../components/MyHeader";
import Sidebar from "../../../components/Sidebar";
import Nav from "../single_user/Nav";
import { PATHS } from "../../../router";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "../../../components/Spinner";
import FetchAllEmployeeForms from "../../../controller/admin/AllFormsController";

export default function SingleUserForms() {
  const { username } = useParams();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [allForms, setAllForms] = useState({});
  const apiBase = import.meta.env.VITE_API_URL;

  useEffect(() => {
    FetchAllEmployeeForms(
      setLoading,
      setErrors,
      setAllForms,
      apiBase,
      username
    );
  }, [username, apiBase]);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "Not signed";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Calculate how long ago a form was signed
  const timeAgo = (dateString) => {
    if (!dateString) return "Never";

    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 2592000)
      return `${Math.floor(diffInSeconds / 86400)} days ago`;

    return formatDate(dateString);
  };

  // Define all possible forms with their display names
  const formDefinitions = [
    { key: "reference", name: "Reference Form", dateField: "created_at" },
    {
      key: "application_form",
      name: "Application Form",
      dateField: "created_at",
    },
    {
      key: "attendance_tardiness",
      name: "Attendance & Tardiness",
      dateField: "created_at",
    },
    {
      key: "confidentiality_information",
      name: "Confidentiality Agreement",
      dateField: "created_at",
    },
    {
      key: "criminal_history_search",
      name: "Criminal History Search",
      dateField: "created_at",
    },
    {
      key: "disclaimer_waiver_liability",
      name: "Disclaimer & Waiver",
      dateField: "created_at",
    },
    {
      key: "drug_testing_policy",
      name: "Drug Testing Policy",
      dateField: "created_at",
    },
    {
      key: "employee_agreement",
      name: "Employee Agreement",
      dateField: "created_at",
    },
    {
      key: "employee_conduct",
      name: "Employee Conduct",
      dateField: "created_at",
    },
    {
      key: "employee_dress_code",
      name: "Employee Dress Code",
      dateField: "created_at",
    },
    {
      key: "employee_orientation",
      name: "Employee Orientation",
      dateField: "created_at",
    },
    {
      key: "employee_reference_check",
      name: "Employee Reference Check",
      dateField: "created_at",
    },
    {
      key: "employee_safety",
      name: "Employee Safety",
      dateField: "created_at",
    },
    {
      key: "health_safety_agreement",
      name: "Health & Safety Agreement",
      dateField: "created_at",
    },
    {
      key: "home_health_aide",
      name: "Home Health Aide",
      dateField: "created_at",
    },
    {
      key: "infection_control",
      name: "Infection Control",
      dateField: "created_at",
    },
    {
      key: "non_compete_agreement",
      name: "Non-Compete Agreement",
      dateField: "created_at",
    },
    {
      key: "policy_procedure",
      name: "Policy & Procedure",
      dateField: "created_at",
    },
    { key: "reporting", name: "Reporting", dateField: "created_at" },
    {
      key: "sexual_harassment",
      name: "Sexual Harassment Policy",
      dateField: "created_at",
    },
    { key: "smoking", name: "Smoking Policy", dateField: "created_at" },
    {
      key: "sworn_disclosure",
      name: "Sworn Disclosure",
      dateField: "created_at",
    },
    {
      key: "universal_precaution",
      name: "Universal Precaution",
      dateField: "created_at",
    },
  ];

  return (
    <>
      <title>Forms - 1staccess Home Care</title>
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
                    <div className="card-header">
                      <h4 className="card-title">User Forms</h4>
                      <p className="mb-0">
                        Total completed:{" "}
                        {
                          Object.values(allForms).filter(
                            (form) => form !== null
                          ).length
                        }
                        /{formDefinitions.length}
                      </p>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive table-icon">
                        <table className="table table-hover">
                          <thead>
                            <tr>
                              <th>Form</th>
                              <th>Date Signed</th>
                              <th>Status</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {formDefinitions.map((formDef) => {
                              const formData = allForms[formDef.key];
                              const isSigned =
                                formData !== null && formData !== undefined;
                              const signedDate = isSigned
                                ? formData[formDef.dateField]
                                : null;

                              return (
                                <tr key={formDef.key}>
                                  <td>
                                    <div className="d-flex align-items-center">
                                      <div>
                                        <h6 className="mb-0">{formDef.name}</h6>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    {isSigned ? (
                                      <div>
                                        <div>{formatDate(signedDate)}</div>
                                        <small className="text-muted">
                                          {timeAgo(signedDate)}
                                        </small>
                                      </div>
                                    ) : (
                                      <span className="text-muted">
                                        Not signed
                                      </span>
                                    )}
                                  </td>
                                  <td>
                                    {isSigned ? (
                                      <span className="badge bg-success light">
                                        Completed
                                      </span>
                                    ) : (
                                      <span className="badge bg-danger light">
                                        Pending
                                      </span>
                                    )}
                                  </td>
                                  <td>
                                    <div className="d-flex justify-content-end">
                                      {isSigned ? (
                                        <>
                                          <button
                                            className="btn btn-primary btn-xs light"
                                            onClick={() => {
                                              // View form details
                                              console.log(
                                                "View form:",
                                                formDef.key,
                                                formData
                                              );
                                            }}
                                          >
                                            <i className="ri-eye-line me-1"></i>{" "}
                                            View
                                          </button>
                                        </>
                                      ) : (
                                        <span className="text-muted">
                                          No actions available
                                        </span>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
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
