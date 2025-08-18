import { useEffect } from "react";

export default function EditStepTwo({
  errors,
  allData,
  formData,
  updateTopic,
  removeTopic,
  addTopic,
  setStep,
  setFormData, // ✅ make sure this is passed in like Step One
}) {
  // Initialize formData.topics with the single topic name when editing
  useEffect(() => {
    if (allData?.length > 0 && allData[0]?.name) {
      // allData is an array, so get the first item's name
      const topicName = allData[0].name; // Access name from first array item

      // Check if formData.topics is empty or contains only empty strings
      const hasEmptyTopics =
        !formData.topics ||
        formData.topics.length === 0 ||
        formData.topics.every((topic) => !topic.trim());

      if (hasEmptyTopics) {
        setFormData((prev) => ({
          ...prev,
          topics: [topicName], // Set as array with single topic
        }));
      }
    }
  }, [allData]); // Only depend on allData

  return (
    <>
      <h4>Step 2: Add Topics</h4>
      {errors.topics && (
        <div className="alert alert-danger mb-3">{errors.topics}</div>
      )}
      {/* Since you only have one topic, render just one input */}
      {formData.topics && formData.topics.length > 0 && (
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter topic name"
            value={formData.topics[0] || ""} // Get the first (and only) topic
            onChange={(e) => updateTopic(0, e.target.value)} // Always update index 0
          />
        </div>
      )}

      {/* Removed Add Another Topic button since you only want one topic */}

      <div className="mt-3">
        <button
          type="button"
          className="btn btn-secondary me-2"
          onClick={() => setStep(1)}
        >
          Back
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setStep(3)}
          disabled={!formData.topics?.[0]?.trim()} // Check if the single topic is empty
        >
          Next
        </button>
      </div>
    </>
  );
}
