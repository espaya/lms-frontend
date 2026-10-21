import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Spinner from "../../../components/Spinner";
import EmployeeHandbookFilled from "./employee_handbook/EmployeeHandbookFilled";
import EmployeeHandbookForm from "./employee_handbook/EmployeeHandbookForm";
import FetchEmployeeHandbook from "../../../controller/user/forms/EmployeeHandbookController";

export default function EmployeeHandbook() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [handbook, setHandbook] = useState([]);
  const apiBase = import.meta.env.VITE_API_URL;

  useEffect(() => {
    FetchEmployeeHandbook(setLoading, setErrors, setHandbook, apiBase);
  }, []);

  const data = handbook?.handbook;
  const fullname = handbook?.profileData;


  return (
    <>
      {loading && <Spinner />}
      {data ? (
        <EmployeeHandbookFilled data={data} fullname={fullname} />
      ) : (
        <EmployeeHandbookForm fullname={fullname} />
      )}
    </>
  );
}
