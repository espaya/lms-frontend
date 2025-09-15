import { useState, useEffect } from "react";
import FetchEmployeeAgreement from "../../../controller/user/forms/AgreementController";
import Spinner from "../../../components/Spinner";
import EmployeeAgreementFilled from "./employee_agreement/EmployeeAgreementFilled";
import EmployeeAgreementForm from "./employee_agreement/EmployeeAgreementForms";

export default function EmployeeAgreement() {
  const [loading, setLoading] = useState(false);
  const [agreement, setAgreement] = useState([]);
  const [errors, setErrors] = useState({});
  const apiBase = import.meta.env.VITE_API_URL;

  useEffect(() => {
    FetchEmployeeAgreement(setLoading, setAgreement, setErrors, apiBase);
  }, []);

  const agreeData = agreement?.agree;
  const fullname = agreement?.profileData;

  return (
    <>
      {loading && <Spinner />}
      {agreeData ? (
        <EmployeeAgreementFilled agreement={agreeData} fullname={fullname} />
      ) : (
        <EmployeeAgreementForm />
      )}
    </>
  );
}
