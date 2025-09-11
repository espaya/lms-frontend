import { useEffect, useState } from "react";
import FetchEmployeeOrientation from "../../../controller/user/forms/OrientationController";
import Spinner from "../../../components/Spinner";
import EmployeeOrientationForms from "./employee_orientation/EmployeeOrientationForms";
import EmployeeOrientationFilled from "./employee_orientation/EmployeeOrientationFilled";
import { Link } from "react-router-dom";
import { PATHS } from "../../../router";

export default function EmployeeOrientation() {
  const [loading, setLoading] = useState(false);
  const apiBase = import.meta.env.VITE_API_URL;
  const [errors, setError] = useState({});
  const [orientation, setOrientation] = useState([]);

  useEffect(() => {
    FetchEmployeeOrientation(setLoading, apiBase, setError, setOrientation);
  }, []);

  const empApp = orientation?.empApp;
  const empOrientation = orientation?.employeeOrientation;
  const fullname = orientation?.profileData;

  return (
    <>
      {loading && <Spinner />}
      {!empApp && <Link to={PATHS.USER_APPLICATION_FORM}></Link>}
      {empOrientation ? (
        <EmployeeOrientationFilled
          orientation={empOrientation}
          fullname={fullname}
          empApp={empApp}
        />
      ) : (
        <EmployeeOrientationForms
          fullname={fullname}
          empApp={empApp}
          empOrientation={empOrientation}
        />
      )}
    </>
  );
}
