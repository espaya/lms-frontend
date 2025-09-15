import { useEffect, useState } from "react";
import FetchEmployeeHealthSafety from "../../../controller/user/forms/HealthSafetyController";
import Spinner from "../../../components/Spinner";
import HealthSafetyFilled from "./health_safety/HealthSafetyFilled";
import HealthSafetyForm from "./health_safety/HealthSafetyForm";

export default function HealthSafety() {
  const [health, setHealth] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const apiBase = import.meta.env.VITE_API_URL;

  useEffect(() => {
    FetchEmployeeHealthSafety(setHealth, setLoading, setErrors, apiBase);
  }, []);

  const data = health?.healthData;
  const fullname = health?.profileData;

  return (
    <>
      {loading && <Spinner />}
      {data ? (
        <HealthSafetyFilled data={data} fullname={fullname} />
      ) : (
        <HealthSafetyForm fullname={fullname} />
      )}
    </>
  );
}
