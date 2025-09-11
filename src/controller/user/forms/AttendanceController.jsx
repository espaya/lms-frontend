import Cookies from "js-cookie";
const FetchAttendance = async (
  apiBase,
  setLoading,
  setErrors,
  getAttendance
) => {
  setLoading(true);
  try {
    const response = await fetch(`${apiBase}/api/user/attendance-forms/get`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        "X-XSRFT-TOKEN": decodeURIComponent(Cookies.get("XSRF-TOKEN")),
      },
    });

    const data = await response.json();
    if (!response.ok) setErrors({ general: data.message });
    getAttendance(data);
  } catch (err) {
    setErrors({ general: err.message });
  } finally {
    setLoading(false);
  }
};
export default FetchAttendance;
