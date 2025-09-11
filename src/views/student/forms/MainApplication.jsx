import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import EmploymentApplication from "./main/EmploymentApplication";
import ApplicationForms from "./main/ApplicationForms";
import Spinner from "../../../components/Spinner";

export default function MainApplication() {
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(false);
  const apiBase = import.meta.env.VITE_API_URL;
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchApplicationForms = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${apiBase}/api/user/application-forms/get`,
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
        } else {
          setDocument(data);
        }
      } catch (err) {
        setErrors({ general: err.message });
      } finally {
        setLoading(false);
      }
    };

    fetchApplicationForms();
  }, []);

  if (loading) return <Spinner />;
  if (errors.general) return <p className="error">{errors.general}</p>;

  // check if employmentApplication exists and has records
  const hasEmploymentApplication =
    !!document?.employmentApplication?.signature?.signature;

  return (
    <>
      {hasEmploymentApplication ? (
        <EmploymentApplication data={document} />
      ) : (
        <ApplicationForms />
      )}
    </>
  );
}
