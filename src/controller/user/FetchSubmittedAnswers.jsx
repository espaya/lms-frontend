// Fetch submitted answers from DB if topic is already submitted
const fetchSubmittedAnswers = async (
  topicId,
  setSubmittedAnswers,
  setErrors,
   apiBase,
   csrfToken
) => {
  try {
    const res = await fetch(`${apiBase}/api/answers/all/${topicId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        Accept: "application/json",
        "X-XSRF-TOKEN": decodeURIComponent(csrfToken),
      },
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      setErrors({ general: data.message || "Failed to fetch answers" });
    } else {
      setSubmittedAnswers((prev) => ({
        ...prev,
        [topicId]: data.answers,
      }));
    }
  } catch (err) {
    setErrors({ general: err.message || err });
  }
};

export default fetchSubmittedAnswers;
