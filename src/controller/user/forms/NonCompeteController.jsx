import Cookies from "js-cookie";

const FetchEmployeeNonCompete = async (
  setNonCompete,
  setErrors,
  setLoading,
  apiBase
) => {
  setLoading(true);
  try {
    const response = await fetch(
      `${apiBase}/api/user/non-compete-agreement-forms/get`,
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
    setNonCompete(data);
  } catch (err) {
    setErrors({ general: err.message });
  } finally {
    setLoading(false);
  }
};

export default FetchEmployeeNonCompete;
