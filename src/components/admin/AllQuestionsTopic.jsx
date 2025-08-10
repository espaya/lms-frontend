import React, { useState } from "react";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

export default function AllQuestionsTopic({
  topic,
  fetchQuestionsForTopic,
  subject,
}) {
  const apiBase = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    // Show confirmation dialog first
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete "${topic.name}" and all its questions. This action cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    // If user confirmed deletion
    if (result.isConfirmed) {
      setLoading(true);

      try {
        await fetch(`${apiBase}/sanctum/csrf-cookie`, {
          credentials: "include",
        });

        const csrfToken = Cookies.get("XSRF-TOKEN");
        const authToken = localStorage.getItem("auth_token");

        const response = await fetch(
          `${apiBase}/api/delete-topic-subject-question/${topic.id}`,
          {
            method: "DELETE",
            credentials: "include",
            headers: {
              Authorization: `Bearer ${authToken}`,
              "X-XSRF-TOKEN": decodeURIComponent(csrfToken),
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: data.message || "Failed to delete topic",
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: data.message || "Topic deleted successfully",
          });
          // Optionally refresh the data after successful deletion
          fetchQuestionsForTopic(topic.id);
          // reload window
          setTimeout(() => window.location.reload(), 3500);
        }
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err.message || "An error occurred",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <div className="rtable-row">
        <div className="rtable-cell topic-cell">
          <div className="rtable-cell--content title-content">
            <h5>{subject.name}</h5>
          </div>
        </div>
        <div className="rtable-cell id-cell">
          <div className="rtable-cell--heading">Topic</div>
          <div className="rtable-cell--content date-content">{topic.name}</div>
        </div>
        <div className="rtable-cell rtable-cell--foot status-cell">
          <div className="rtable-cell--heading">Created At</div>
          <div className="rtable-cell--content purchase-content">
            {new Date(topic.created_at).toLocaleDateString()}
          </div>
        </div>
        <div className="rtable-cell rtable-cell--foot receipt-cell">
          <div className="rtable-cell--heading">Actions</div>
          <div className="rtable-cell--content pdf-content">
            <a
              href="#"
              className="icon-link"
              title="View"
              onClick={(e) => {
                e.preventDefault();
                fetchQuestionsForTopic(topic.id);
              }}
            >
              <i style={{ fontSize: "18px" }} className="ri-eye-line" />
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleDelete();
              }}
              className="icon-link"
              title="Delete"
              disabled={loading}
            >
              {loading ? (
                <i className="ri-loader-4-line animate-spin" />
              ) : (
                <i
                  style={{ fontSize: "18px" }}
                  className="ri-delete-bin-line"
                />
              )}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
