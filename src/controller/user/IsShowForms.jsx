const IsShowForms = async (apiBase, setErrors, setIsShowForms, csrfToken) => {
  try {
    // 1. Check if the value is already cached in the browser
    const cachedValue = sessionStorage.getItem("activateForms");

    if (cachedValue !== null) {
      // If it exists, set the state immediately and return (skip the API call)
      setIsShowForms(Number(cachedValue) === 1 || cachedValue === "true");
      return;
    }

    // 2. If not cached, hit the backend
    const response = await fetch(
      `${apiBase}/api/user/dashboard/is-show-forms-active`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "X-XSRF-TOKEN": decodeURIComponent(csrfToken),
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      },
    );

    const data = await response.json();

    if (!response.ok) {
      setErrors({ general: data.message });
      return;
    }

    // 3. Save the new value to the browser cache
    sessionStorage.setItem("activateForms", data.activateForms);

    // 4. Update the React state
    setIsShowForms(
      Number(data.activateForms) === 1 || data.activateForms === true,
    );
  } catch (err) {
    setErrors({ general: err.message });
  }
};

export default IsShowForms;
