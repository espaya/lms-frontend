import { useState, useEffect } from "react";
import MyHeader from "../../components/MyHeader";
import Sidebar from "../../components/Sidebar";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import EditStepOne from "../../components/edit_question/EditStepOne";
import EditStepTwo from "../../components/edit_question/EditStepTwo";
import EditStepThree from "../../components/edit_question/EditStepThree";
import { useParams } from "react-router-dom";

export default function EditQuestion() {
  const params = useParams();
  const id = params.id;
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const apiBase = import.meta.env.VITE_API_URL;
  const [allData, setAllData] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const [formData, setFormData] = useState({
    subject: "",
    topics: [""],
    questions: [
      {
        id: null,
        text: "",
        options: ["", "", "", ""],
        correctIndex: 0,
      },
    ],
  });

  // === Topic Functions ===
  const addTopic = () => {
    setFormData((prev) => ({ ...prev, topics: [...prev.topics, ""] }));
  };

  const updateTopic = (index, value) => {
    setFormData((prev) => {
      const topics = [...prev.topics];
      topics[index] = value;
      return { ...prev, topics };
    });
  };

  const removeTopic = (index) => {
    if (formData.topics.length > 1) {
      setFormData((prev) => {
        const topics = [...prev.topics];
        topics.splice(index, 1);
        return { ...prev, topics };
      });
    }
  };

  // === Question Functions (all spread the question so `id` survives) ===
  const addQuestion = () => {
    setFormData((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        { id: null, text: "", options: ["", "", "", ""], correctIndex: 0 },
      ],
    }));
  };

  const updateQuestionText = (qIndex, text) => {
    setFormData((prev) => {
      const questions = [...prev.questions];
      questions[qIndex] = { ...questions[qIndex], text };
      return { ...prev, questions };
    });
  };

  const updateOption = (qIndex, optIndex, value) => {
    setFormData((prev) => {
      const questions = [...prev.questions];
      const options = [...questions[qIndex].options];
      options[optIndex] = value;
      questions[qIndex] = { ...questions[qIndex], options };
      return { ...prev, questions };
    });
  };

  const updateCorrectAnswer = (qIndex, correctIndex) => {
    setFormData((prev) => {
      const questions = [...prev.questions];
      questions[qIndex] = { ...questions[qIndex], correctIndex };
      return { ...prev, questions };
    });
  };

  const removeQuestion = (qIndex) => {
    if (formData.questions.length > 1) {
      setFormData((prev) => {
        const questions = [...prev.questions];
        questions.splice(qIndex, 1);
        return { ...prev, questions };
      });
    }
  };

  // === Validation ===
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
      await fetch(`${apiBase}/sanctum/csrf-cookie`, {
        credentials: "include",
      });

      const csrfToken = Cookies.get("XSRF-TOKEN");
      const authToken = localStorage.getItem("auth_token");

      if (!authToken) throw new Error("Authentication token not found");

      const payload = new FormData();
      payload.append("subject", formData.subject);

      formData.topics.forEach((topic, i) =>
        payload.append(`topics[${i}]`, topic)
      );

      // ⬇ Send questions as JSON string WITH id — matches backend update()
      payload.append(
        "questions",
        JSON.stringify(
          formData.questions.map((q) => ({
            id: q.id ?? null,
            text: q.text,
            options: q.options,
            correctIndex: q.correctIndex,
          }))
        )
      );

      // Optional replacement PDF
      if (uploadedFiles.length > 0) {
        payload.append("file", uploadedFiles[0]);
      }

      const response = await fetch(
        `${apiBase}/api/admin/dashboard/upload-questions/update/${id}`,
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

      const responseText = await response.text();
      const result = responseText ? JSON.parse(responseText) : {};

      if (!response.ok) {
        // Handle 422 validation errors properly
        if (response.status === 422 && result.errors) {
          setErrors(
            Object.fromEntries(
              Object.entries(result.errors).map(([k, v]) => [k, v[0]])
            )
          );
          throw new Error(result.message || "Please fix the errors above");
        }
        throw new Error(
          result.message ||
            result.errors?.join?.("\n") ||
            "Failed to update questions"
        );
      }

      await Swal.fire({
        title: "Success!",
        text: result.message || "Quiz updated successfully",
        icon: "success",
        confirmButtonText: "OK",
      });

      // Edit flow → return to the list, don't blank the form
      window.location.href = "/admin/dashboard/all-questions";
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message || "An error occurred during update",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  // === Fetch topic ===
  useEffect(() => {
    const fetchQuestionData = async () => {
      try {
        await fetch(`${apiBase}/sanctum/csrf-cookie`, {
          credentials: "include",
        });

        const csrfToken = Cookies.get("XSRF-TOKEN");
        const authToken = localStorage.getItem("auth_token");

        const res = await fetch(`${apiBase}/api/topics/single/${id}`, {
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

        if (!res.ok) {
          setErrors({ general: data.message }); // ⬅ was "generla"
        } else {
          // Defensive: accept either an object or an array-with-one-item
          setAllData(Array.isArray(data) ? data : data ? [data] : []);
        }
      } catch (err) {
        console.error("Error fetching topic:", err);
        setErrors({ general: err.message });
      }
    };

    fetchQuestionData();
  }, [apiBase, id]);

  // === UI ===
  return (
    <>
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="assets/images/favicon.png"
      />
      <title>Edit Manager - 1staccess Home Care</title>
      <div id="main-wrapper">
        <MyHeader />
        <Sidebar />
        <div className="content-body">
          <div className="container">
            <div className="page-title">
              <div className="row align-items-center justify-content-between">
                <div className="col-md-6">
                  <div className="page-title-content">
                    <h3>Edit Questions</h3>
                    <p className="mb-2">Add multiple choice questions here</p>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="breadcrumbs">
                    <a href="#">Home </a>
                    <span><i className="ri-arrow-right-s-line" /></span>
                    <a href="#">Manage Questions</a>
                    <span><i className="ri-arrow-right-s-line" /></span>
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
                  <EditStepOne
                    formData={formData}
                    allData={allData}
                    errors={errors}
                    setStep={setStep}
                    setFormData={setFormData}
                  />
                )}

                {step === 2 && (
                  <EditStepTwo
                    errors={errors}
                    allData={allData}
                    formData={formData}
                    updateTopic={updateTopic}
                    removeTopic={removeTopic}
                    addTopic={addTopic}
                    setStep={setStep}
                    setFormData={setFormData}
                  />
                )}

                {step === 3 && (
                  <EditStepThree
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
                    setFormData={setFormData}
                    allData={allData}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}