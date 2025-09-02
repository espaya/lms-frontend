const isAnswered = async (apiBase, setErrors, setAnswered, csrfToken, topic_id) => {
  try {
    const response = await fetch(`${apiBase}/api/user/is-answered/${topic_id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "X-XSRF-TOKEN": decodeURIComponent(csrfToken),
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });

    const data = await response.json();

    console.log(data);

    if (!response.ok) {
      setErrors({ general: data.message });
    } else {
      setAnswered(data.answered);
    }
  } catch (err) {
    setErrors({ general: err.message });
  }
};

export default isAnswered;
