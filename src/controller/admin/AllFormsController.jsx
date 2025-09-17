import Cookies from "js-cookie";

const FetchAllEmployeeForms = async (
  setLoading,
  setErrors,
  setAllForms,
  apiBase,
  username
) => {
  setLoading(true);
  try {
    const response = await fetch(
      `${apiBase}/api/admin/dashboard/all-forms/${username}`,
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
    setAllForms(data);
  } catch (err) {
    setErrors({ genera: err.message });
  } finally {
    setLoading(false);
  }
};

export default FetchAllEmployeeForms;
