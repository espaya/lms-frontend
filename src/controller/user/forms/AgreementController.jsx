import Cookies from "js-cookie";

const FetchEmployeeAgreement = async (
  setLoading,
  setAgreement,
  setErrors,
  apiBase
) => {
  setLoading(true);
  try {
    const response = await fetch(`${apiBase}/api/`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        "X-XSRF-TOKEN": decodeURIComponent(Cookies.get("XSRF-TOKEN")),
      },
    });

    const data = await response.json();
    if (!response.ok) setErrors({ general: data.message });
    setAgreement(data);
  } catch (err) {
    setErrors({ general: err.message });
  } finally {
    setLoading(false);
  }
};

export default FetchEmployeeAgreement;
