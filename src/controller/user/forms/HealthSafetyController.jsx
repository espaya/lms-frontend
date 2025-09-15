import Cookies from "js-cookie";

const FetchEmployeeHealthSafety = async (
  setHealth,
  setLoading,
  setErrors,
  apiBase
) => {
  setLoading(true);
  try {
    const response = await fetch(
      `${apiBase}/api/user/employee-health-safety-forms/get`,
      {
        credentials: "include",
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          "X-XSRF-TOKEN": decodeURIComponent(Cookies.get("XSRF-TOKEN")),
        },
      }
    );

    const data = await response.json();
    if (!response.ok) setErrors({ general: data.message });
    setHealth(data);
  } catch (err) {
    setErrors({ general: err.message });
  } finally {
    setLoading(false);
  }
};

export default FetchEmployeeHealthSafety;
