import Cookies from "js-cookie";

const FetchEmployeeOrientation = async (
  setLoading,
  apiBase,
  setErrors,
  setOrientation
) => {
  setLoading(true);
  try {
    const response = await fetch(
      `${apiBase}/api/user/employee-orientation-form/get`,
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
    if (!response.ok) {
      setErrors({ general: data.message });
      return;
    }
    setOrientation(data);
  } catch (err) {
    setErrors({ general: err.message });
  } finally {
    setLoading(false);
  }
};

export default FetchEmployeeOrientation;
