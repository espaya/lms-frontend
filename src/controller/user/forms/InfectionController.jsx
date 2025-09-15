import Cookies from "js-cookie";

const FetchEmployeeInfection = async (
  setInfection,
  setLoading,
  setErrors,
  apiBase
) => {
  setLoading(true);
  try {
    const response = await fetch(
      `${apiBase}/api/user/employee-infection-control-forms/get`,
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
    setInfection(data);
  } catch (err) {
    setErrors({ general: err.message });
  } finally {
    setLoading(false);
  }
};

export default FetchEmployeeInfection;
