import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import FetchEmployeeConduct from "../../../controller/user/forms/EmployeeConductController";
import Spinner from "../../../components/Spinner";
import EmployeeConductFilled from "./employee_conduct/EmployeeConductFilled";
import EmployeeConductForms from "./employee_conduct/EmployeeConductForms";

export default function EmployeeConduct() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [conduct, setConduct] = useState([]);
  const apiBase = import.meta.env.VITE_API_URL;

  useEffect(() => {
    FetchEmployeeConduct(setLoading, setErrors, setConduct, apiBase);
  }, []);

  const data = conduct?.empConduct;
  const fullname = conduct?.profileData;

  return (
    <>
      {loading && <Spinner />}
      {data ? (
        <EmployeeConductFilled data={conduct} fullname={fullname} />
      ) : (
        <EmployeeConductForms fullname={fullname} />
      )}
    </>
  );
}
