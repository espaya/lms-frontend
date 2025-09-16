import Cookies from "js-cookie";

const FetchEmployeeReporting = async (
  setReporting,
  setLoading,
  setError,
  apiBase
) => {
  setLoading(true);
  try {
    const response = await fetch(
      `${apiBase}/api/user/reporting-abuse-neglect-exploitation-forms/get`,
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
      setError({ general: data.message });
      return;
    }
    setReporting(data);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

export default FetchEmployeeReporting;
