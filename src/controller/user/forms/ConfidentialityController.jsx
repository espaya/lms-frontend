import Cookies from "js-cookie";

const FetchConfidentiality = async (
  setLoading,
  setErrors,
  apiBase,
  setConfidentiality
) => {
  setLoading(true);
  try {
    const response = await fetch(
      `${apiBase}/api/user/confidentiality-forms/get`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          "X-XSRF-TOKEN": decodeURIComponent(Cookies.get("XSRF-TOKEN")),
        },
      }
    );

    const data = await response.json();
    if (!response.ok) setErrors({ general: data.message });
    setConfidentiality(data);
  } catch (err) {
    setErrors({ general: err.message });
  } finally {
    setLoading(false);
  }
};

export default FetchConfidentiality;
