import { useState, useEffect } from "react";
import MyHeader from "../../../components/MyHeader";
import Sidebar from "../../../components/Sidebar";
import Nav from "./Nav";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import Pagination from "../../../components/Pagination";

export default function Quizzes() {
  const [errors, setErrors] = useState({});
  const [quizzes, setQuizzes] = useState([]);
  const apiBase = import.meta.env.VITE_API_URL;
  const { username } = useParams();
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");

  // Get quiz reports for this user
  useEffect(() => {
    const fetchQuizzes = async () => {
      setErrors({});
      setLoading(true);
      try {
        await fetch(`${apiBase}/sanctum/csrf-cookie`, {
          credentials: "include",
        });

        const csrfToken = Cookies.get("XSRF-TOKEN");
        const authToken = localStorage.getItem("auth_token");

        const response = await fetch(
          `${apiBase}/api/users/single/${username}/quizzes`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "X-XSRF-TOKEN": decodeURIComponent(csrfToken),
              Authorization: `Bearer ${authToken}`,
            },
          },
        );

        const data = await response.json();

        if (!response.ok) {
          if (data.message) {
            setErrors({ general: data.message });
          }
        } else {
          setQuizzes(data);
        }
      } catch (err) {
        setErrors({ general: err.message });
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, [apiBase, username]);

  // Fetch user profile for full name
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(
          `${apiBase}/api/admin/dashboard/all-forms/${username}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
            },
          },
        );

        const data = await response.json();
        if (response.ok) {
          setFullName(data?.application_form?.profile?.full_name || "");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    fetchUserProfile();
  }, [apiBase, username]);

  // Helper to convert signature image to Base64 for Word Docs
  const fetchSignatureAsBase64 = async (signatureFilename) => {
    if (!signatureFilename) return null;
    try {
      const response = await fetch(
        `${apiBase}/storage/signature/${signatureFilename}`,
      );
      const blob = await response.blob();
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          // ⬇ FIX: Remove any spaces or line breaks from the base64 string
          // Word crashes silently if the base64 string has spaces in it
          const base64String = reader.result.replace(/[\r\n\s]+/g, "");
          resolve(base64String);
        };
        reader.readAsDataURL(blob);
      });
    } catch (err) {
      console.error("Failed to load signature image:", err);
      return null;
    }
  };

  // === Download Word Document Logic ===
  const downloadWordDoc = async () => {
    if (!quizzes.answers || quizzes.answers.length === 0) return;

    let tableHTML = `
      <table border="1" cellpadding="5" cellspacing="0" style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="background-color: #f3f3f3;">
            <th>Topic</th>
            <th>Score</th>
            <th>Total</th>
            <th>Percentage</th>
            <th>Date Taken</th>
            <th>Signature</th>
          </tr>
        </thead>
        <tbody>
    `;

    for (const quiz of quizzes.answers) {
      const percentage = ((quiz.score / quiz.total) * 100).toFixed(2);
      const date = new Date(quiz.created_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

      let signatureHTML = "Not Signed";

      if (quiz.signature) {
        const base64Img = await fetchSignatureAsBase64(quiz.signature);
        if (base64Img) {
          // ⬇ FIX: Set width/height directly as attributes, NOT just inline styles
          // Word ignores max-width/max-height in inline styles for Base64 images
          signatureHTML = `<img src="${base64Img}" width="120" height="40" style="display: block;" alt="Signature" />`;
        } else {
          signatureHTML = "Signed";
        }
      }

      tableHTML += `
        <tr>
          <td>${quiz.topic?.name || "No Topic"}</td>
          <td>${quiz.score}</td>
          <td>${quiz.total}</td>
          <td>${percentage}%</td>
          <td>${date}</td>
          <td style="text-align: center; vertical-align: middle;">${signatureHTML}</td>
        </tr>
      `;
    }

    tableHTML += `</tbody></table>`;

    const finalName = fullName.trim() ? fullName.trim() : username;
    const safeFilename = finalName.replace(/\s+/g, "_");

    const htmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>Quiz Report</title>
        <style>
          body { font-family: Arial, sans-serif; }
          h2 { text-align: center; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #000; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        <h2>Quiz Report for ${finalName}</h2>
        ${tableHTML}
      </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Quiz_Report_${safeFilename}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <title>Quizzes - 1staccess Home Care</title>
      <div id="main-wrapper">
        <MyHeader />
        <Sidebar />
        <div className="content-body">
          <div className="container">
            <div className="page-title">
              <div className="row align-items-center justify-content-between">
                <div className="col-md-6">
                  <div className="page-title-content">
                    <h3>Quizzes</h3>
                    <p className="mb-2">Manage all quizzes taken by user</p>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="breadcrumbs">
                    <a href="#">Profile </a>
                    <span>
                      <i className="ri-arrow-right-s-line"></i>
                    </span>
                    <a href="#">Quizzes</a>
                  </div>

                  <div className="mt-2 text-end">
                    <button
                      className="btn btn-primary"
                      onClick={downloadWordDoc}
                      disabled={
                        !quizzes.answers || quizzes.answers.length === 0
                      }
                    >
                      Download Report <i className="ri-download-2-line ms-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <Nav username={username} />
              {loading ? (
                <div className="text-center my-5">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <div className="col-md-9">
                  <div className="card">
                    <div className="card-body">
                      {errors.general && (
                        <div className="alert alert-danger">
                          {errors.general}
                        </div>
                      )}

                      {quizzes.answers && quizzes.answers.length > 0 ? (
                        quizzes.answers.map((quiz, index) => (
                          <div key={index}>
                            <div className="verify-content d-flex align-items-center justify-content-between">
                              <div className="d-flex align-items-center">
                                <span className="me-16 icon-circle bg-primary text-white">
                                  <i className="ri-file-warning-line"></i>
                                </span>
                                <div className="primary-number">
                                  <p className="mb-0">
                                    <strong>
                                      {quiz.topic?.name || "No Topic"}
                                    </strong>
                                  </p>
                                  <small
                                    style={{
                                      fontSize: "14px",
                                      fontWeight: "bold",
                                    }}
                                    className="text-success"
                                  >
                                    Score: {quiz.score} / {quiz.total} (
                                    {((quiz.score / quiz.total) * 100).toFixed(
                                      2,
                                    )}
                                    %) |{" "}
                                    {new Date(
                                      quiz.created_at,
                                    ).toLocaleDateString("en-US", {
                                      month: "short",
                                      day: "numeric",
                                      year: "numeric",
                                    })}{" "}
                                    | {quiz.signature ? "Signed" : "Not Signed"}
                                  </small>
                                </div>
                              </div>
                            </div>

                            <hr className="dropdown-divider my-16" />
                          </div>
                        ))
                      ) : (
                        <div className="alert alert-info mx-auto">
                          No quizzes found for this user..
                        </div>
                      )}

                      <Pagination
                        currentPage={quizzes.meta?.current_page || 1}
                        lastPage={quizzes.meta?.last_page || 1}
                        onPageChange={(page) => fetchQuizzes(page)}
                      />
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
