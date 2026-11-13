import React from "react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/DateFormatter";

export default function AllQuestionsTopic({ topic, subject, fetchQuestionsForTopic }) {
  const navigate = useNavigate();

  // ⬇ Extract the schedule date from the first question (if it exists)
  const firstQuestion = topic.questions && topic.questions.length > 0 ? topic.questions[0] : null;
  const availableFrom = firstQuestion?.available_from;

  return (
    <div className="rtable-row">
      <div className="rtable-cell topic-cell">
        <div className="rtable-cell--content title-content">
          <h5>{subject.name}</h5>
        </div>
      </div>
      
      <div className="rtable-cell id-cell">
        <div className="rtable-cell--heading">Topic</div>
        <div className="rtable-cell--content date-content">
          {topic.name}
        </div>
      </div>

      {/* ⬇ UPDATED DATE COLUMN */}
      <div className="rtable-cell rtable-cell--foot status-cell">
        <div className="rtable-cell--heading">Scheduled Date</div>
        <div className="rtable-cell--content purchase-content">
          <span className="badge bg-warning text-dark">
              {formatDate(availableFrom)}
            </span>
        </div>
      </div>

      {/* Actions Column */}
      <div className="rtable-cell rtable-cell--foot receipt-cell">
        <div className="rtable-cell--heading">Actions</div>
        <div className="rtable-cell--content pdf-content d-flex gap-2">
          {/* View Questions Button */}
          <button
            className="icon-link payout-icon sm-success-lighten text-success border-0 bg-transparent"
            title="View Questions"
            onClick={(e) => {
              e.preventDefault();
              fetchQuestionsForTopic(topic.id);
            }}
          >
            <i style={{ fontSize: "18px" }} className="ri-eye-line" />
          </button>

          {/* Edit Button */}
          <button
            className="icon-link payout-icon text-primary border-0 bg-transparent"
            title="Edit Quiz"
            onClick={(e) => {
              e.preventDefault();
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