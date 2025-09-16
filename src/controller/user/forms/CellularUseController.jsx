import Cookies from "js-cookie";

const FetchCellularUse = async (
  setCellular,
  setLoading,
  setErrors,
  apiBase
) => {
  setLoading(true);
  try {
    const response = await fetch(
      `${apiBase}/api/user/employee-safety-cellular-phone-use/get`,
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
      setErrors(data.errors || { general: data.message });
      return;
    }
    setCellular(data);
  } catch (err) {
    setErrors({ general: err.message });
  } finally {
    setLoading(false);
  }
};

export default FetchCellularUse;
