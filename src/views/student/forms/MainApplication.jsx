import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import EmploymentApplication from "./main/EmploymentApplication";
import ApplicationForms from "./main/ApplicationForms";
import Spinner from "../../../components/Spinner";
import fetchApplicationForms from "../../../controller/user/forms/EmploymentApplication";

export default function MainApplication() {
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(false);
  const apiBase = import.meta.env.VITE_API_URL;
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchApplicationForms(setDocument, setLoading, apiBase, setErrors);
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
