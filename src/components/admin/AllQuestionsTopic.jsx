import React from "react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/DateFormatter";

export default function AllQuestionsTopic({
  topic,
  subject,
  fetchQuestionsForTopic,
}) {
  const navigate = useNavigate();

  // ⬇ SAFE ACCESS: If topic or topic.questions is undefined, return null safely
  const firstQuestion =
    topic?.questions?.length > 0 ? topic.questions[0] : null;
  const availableFrom = firstQuestion?.available_from;

  // ⬇ If topic is completely missing, don't render anything for this row
  if (!topic) return null;

  return (
    <div className="rtable-row">
      <div className="rtable-cell topic-cell">
        <div className="rtable-cell--content title-content">
          <h5>{subject?.name || "No Subject"}</h5>
        </div>
      </div>

      <div className="rtable-cell id-cell">
        <div className="rtable-cell--heading">Topic</div>
        <div className="rtable-cell--content date-content">
          {topic?.name || "No Topic"}
        </div>
      </div>

      <div className="rtable-cell rtable-cell--foot status-cell">
        <div className="rtable-cell--heading">Date</div>
        <div className="rtable-cell--content purchase-content">
          {availableFrom ? (
            <span className="badge bg-warning text-dark">
              Scheduled: {formatDate(availableFrom)}
            </span>
          ) : (
            <span>
              {topic?.created_at ? formatDate(topic.created_at) : "N/A"}
            </span>
          )}
        </div>
      </div>

      <div className="rtable-cell rtable-cell--foot receipt-cell">
        <div className="rtable-cell--heading">Actions</div>
        <div className="rtable-cell--content pdf-content d-flex gap-2">
          <button
            className="icon-link payout-icon sm-success-lighten text-success border-0 bg-transparent"
            title="View Questions"
            onClick={(e) => {
              e.preventDefault();
              if (topic?.id) fetchQuestionsForTopic(topic.id);
            }}
          >
            <i style={{ fontSize: "18px" }} className="ri-eye-line" />
          </button>

          <button
            className="icon-link payout-icon text-primary border-0 bg-transparent"
            title="Edit Quiz"
            onClick={(e) => {
              e.preventDefault();
              if (topic?.id)
                navigate(`/admin/dashboard/all-questions/${topic.id}`);
            }}
          >
            <i style={{ fontSize: "18px" }} className="ri-edit-line" />
          </button>
        </div>
      </div>
    </div>
  );
}
