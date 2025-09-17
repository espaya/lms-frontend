import { useEffect, useState } from "react";
import FetchEmployeeReference from "../../../controller/user/forms/EmployeeReferenceController";
import Spinner from "../../../components/Spinner";
import EmployeeReferenceCheckFilled from "./employee_reference_check/EmployeeReferenceCheckFilled";
import EmployeeReferenceCheckForm from "./employee_reference_check/EmployeeReferenceCheckForm";

export default function EmployeeReferenceCheck() {
  const [reference, setReference] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const apiBase = import.meta.env.VITE_API_URL;

  useEffect(() => {
    FetchEmployeeReference(setReference, setErrors, setLoading, apiBase);
  }, []);

  const data = reference?.empRefCheck;
  const fullname = reference?.profileData;

  return (
    <>
      {loading && <Spinner />}
      {data ? (
        <EmployeeReferenceCheckFilled data={data} fullname={fullname} />
      ) : (
        <EmployeeReferenceCheckForm fullname={fullname} />
      )}
    </>
  );
}
