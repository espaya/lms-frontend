import Cookies from "js-cookie";

const FetchEmployeePolicyProcedure = async (
  setPolicy,
  setErrors,
  setLoading,
  apiBase
) => {
  setLoading(true);
  try {
    const response = await fetch(
      `${apiBase}/api/user/policy-and-procedure-forms/get`,
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
      setErrors({ general: err.message });
      return;
    }

    setPolicy(data);
  } catch (err) {
    setErrors({ general: err.message });
  } finally {
    setLoading(false);
  }
};

export default FetchEmployeePolicyProcedure;
