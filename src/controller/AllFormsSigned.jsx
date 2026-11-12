const AllFormsSigned = async (apiBase, setErrors, setIsSigned, csrfToken) => {
  try {
    const response = await fetch(`${apiBase}/api/is-all-forms-signed`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "X-XSRF-TOKEN": decodeURIComponent(csrfToken),
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      setErrors({ general: data.message });
    } else {
      setIsSigned(data.signed);
    }
  } catch (err) {
    setErrors({ general: err.message });
  }
};

export default AllFormsSigned;
