import { useState, useEffect } from "react";
import MyHeader from "../../components/MyHeader";
import Sidebar from "../../components/Sidebar";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import StepThree from "./question_upload/StepThree";
import StepTwo from "./question_upload/StepTwo";
import StepOne from "./question_upload/StepOne";

export default function QuestionManager() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const apiBase = import.meta.env.VITE_API_URL;
  const [allSubjects, setAllSubjects] = useState([]);
  const [allTopics, setAllTopics] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const [formData, setFormData] = useState({
    subject: "",
    topics: [""],
    questions: [
      {
        text: "",
        options: ["", "", "", ""],
        correctIndex: 0,
      },
    ],
  });

  // === Topic Functions ===
  const addTopic = () => {
    setFormData((prev) => ({
      ...prev,
      topics: [...prev.topics, ""],
    }));
  };

  const updateTopic = (index, value) => {
    const updated = [...formData.topics];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, topics: updated }));
  };

  const removeTopic = (index) => {
    if (formData.topics.length > 1) {
      const updated = [...formData.topics];
      updated.splice(index, 1);
      setFormData((prev) => ({ ...prev, topics: updated }));
    }
  };

  // === Question Functions ===
  const addQuestion = () => {
    setFormData((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          text: "",
          options: ["", "", "", ""],
          correctIndex: 0,
        },
      ],
    }));
  };

  const updateQuestionText = (qIndex, text) => {
    const updated = [...formData.questions];
    updated[qIndex].text = text;
    setFormData((prev) => ({ ...prev, questions: updated }));
  };

  const updateOption = (qIndex, optIndex, value) => {
    const updated = [...formData.questions];
    updated[qIndex].options[optIndex] = value;
    setFormData((prev) => ({ ...prev, questions: updated }));
  };

  const updateCorrectAnswer = (qIndex, correctIndex) => {
    const updated = [...formData.questions];
    updated[qIndex].correctIndex = correctIndex;
    setFormData((prev) => ({ ...prev, questions: updated }));
  };

  const removeQuestion = (qIndex) => {
    if (formData.questions.length > 1) {
      const updated = [...formData.questions];
      updated.splice(qIndex, 1);
      setFormData((prev) => ({ ...prev, questions: updated }));
    }
  };

  // === Form Validation ===
  const validateForm = () => {
    const newErrors = {};

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (formData.topics.some((topic) => !topic.trim())) {
      newErrors.topics = "All topics must have content";
    }

    if (formData.questions.some((q) => !q.text.trim())) {
      newErrors.questions = "All questions must have content";
    }

    if (formData.questions.some((q) => q.options.some((opt) => !opt.trim()))) {
      newErrors.options = "All options must have content";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // === Submit ===
  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      // Get CSRF token first
      await fetch(`${apiBase}/sanctum/csrf-cookie`, {
        credentials: "include",
      });

      const csrfToken = Cookies.get("XSRF-TOKEN");
      const authToken = localStorage.getItem("auth_token");

      if (!authToken) {
        throw new Error("Authentication token not found");
      }

      const payload = new FormData();
      payload.append("subject", formData.subject);

      formData.topics.forEach((topic, i) =>
        payload.append(`topics[${i}]`, topic)
      );

      formData.questions.forEach((q, i) => {
        payload.append(`questions[${i}][text]`, q.text);
        q.options.forEach((opt, j) => {
          payload.append(`questions[${i}][options][${j}]`, opt);
        });
        payload.append(`questions[${i}][correctIndex]`, q.correctIndex);
      });

      // Append only one file
      if (uploadedFiles.length > 0) {
        payload.append("file", uploadedFiles[0]);
      }

      const response = await fetch(
        `${apiBase}/api/admin/dashboard/upload-questions`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authToken}`,
            Accept: "application/json",
            "X-XSRF-TOKEN": csrfToken ? decodeURIComponent(csrfToken) : "",
          },
          body: payload,
          credentials: "include",
        }
      );

      // Handle empty or non-JSON responses
      const responseText = await response.text();
      const result = responseText ? JSON.parse(responseText) : {};

      if (!response.ok) {
        throw new Error(
          result.message ||
            result.errors?.join?.("\n") ||
            "Failed to upload questions"
        );
      }

      // Success handling
      await Swal.fire({
        title: "Success!",
        text: result.message || "Questions uploaded successfully",
        icon: "success",
        confirmButtonText: "OK",
      });

      // Reset form
      setStep(1);
      setFormData({
        subject: "",
        topics: [""],
        questions: [{ text: "", options: ["", "", "", ""], correctIndex: 0 }],
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message || "An error occurred during upload",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  // Get all subjects
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        await fetch(`${apiBase}/sanctum/csrf-cookie`, {
          credentials: "include",
        });

        const csrfToken = Cookies.get("XSRF-TOKEN");
        const authToken = localStorage.getItem("auth_token");

        const res = await fetch(`${apiBase}/api/subjects`, {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${authToken}`,
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-XSRF-TOKEN": csrfToken ? decodeURIComponent(csrfToken) : "",
          },
        });

        const data = await res.json();

        console.log(data.data);

        if (!res.ok) {
          console.log(data.message);
        } else {
          setAllSubjects(data.data || []);
        }
      } catch (err) {
        console.error("Error fetching subjects:", err);
      }
    };

    fetchSubjects();
  }, []);

  // Get all topics
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        await fetch(`${apiBase}/sanctum/csrf-cookie`, {
          credentials: "include",
        });

        const csrfToken = Cookies.get("XSRF-TOKEN");
        const authToken = localStorage.getItem("auth_token");

        const res = await fetch(`${apiBase}/api/topics`, {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${authToken}`,
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-XSRF-TOKEN": csrfToken ? decodeURIComponent(csrfToken) : "",
          },
        });

        const data = await res.json();

        console.log(data.data);

        if (!res.ok) {
          console.log(data.message);
        } else {
          setAllTopics(data.data || []);
        }
      } catch (err) {
        console.error("Error fetching subjects:", err);
      }
    };

    fetchTopics();
  }, []);

  // === UI ===
  return (
    <>
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="assets/images/favicon.png"
      />
      <title>Question Manager - 1staccess Home Care</title>
      <div id="main-wrapper">
        <MyHeader />
        <Sidebar />
        <div className="content-body">
          <div className="container">
            <div className="page-title">
              <div className="row align-items-center justify-content-between">
                <div className="col-md-6">
                  <div className="page-title-content">
                    <h3>Add Questions</h3>
                    <p className="mb-2">Add multiple choice questions here</p>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="breadcrumbs">
                    <a href="#">Home </a>
                    <span>
                      <i className="ri-arrow-right-s-line" />
                    </span>
                    <a href="#">Manage Questions</a>
                    <span>
                      <i className="ri-arrow-right-s-line" />
                    </span>
                    <a href="#">Add Questions</a>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <a
                      href="/admin/dashboard/all-questions"
                      className="btn btn-primary mt-10"
                    >
                      All Question
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {errors.general && (
              <div className="alert alert-danger">{errors.general}</div>
            )}

            <div className="card">
              <div className="card-body">
                {step === 1 && (
                  <StepOne
                    formData={formData}
                    allSubjects={allSubjects}
                    errors={errors}
                    setStep={setStep}
                    setFormData={setFormData}
                  />
                )}

                {step === 2 && (
                  <StepTwo
                    errors={errors}
                    allTopics={allTopics}
                    formData={formData}
                    updateTopic={updateTopic}
                    removeTopic={removeTopic}
                    addTopic={addTopic}
                    setStep={setStep}
                  />
                )}

                {step === 3 && (
                  <>
                    <StepThree
                      formData={formData}
                      errors={errors}
                      loading={loading}
                      addQuestion={addQuestion}
                      handleSubmit={handleSubmit}
                      removeQuestion={removeQuestion}
                      setStep={setStep}
                      updateQuestionText={updateQuestionText}
                      updateOption={updateOption}
                      updateCorrectAnswer={updateCorrectAnswer}
                      uploadedFiles={uploadedFiles}
                      setUploadedFiles={setUploadedFiles}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
