import Cookies from "js-cookie";

const FetchEmployeeOrientation = async (
  setLoading,
  apiBase,
  setError,
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
    if (!response.ok) setError({ general: data.message });
    setOrientation(data);
  } catch (err) {
    setError({ general: err.message });
  } finally {
    setLoading(false);
  }
};

export default FetchEmployeeOrientation;
