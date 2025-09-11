import Cookies from "js-cookie";
const FetchDrugTesting = async (
  apiBase,
  setErrors,
  setLoading,
  setDrugTesting
) => {
  setLoading(true);
  try {
    const response = await fetch(
      `${apiBase}/api/user/drug-testing-policy-forms/get`,
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
    setDrugTesting(data);
  } catch (err) {
    setErrors({ general: err.message });
  } finally {
    setLoading(false);
  }
};

export default FetchDrugTesting;
