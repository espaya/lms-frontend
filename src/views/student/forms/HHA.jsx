import { useEffect, useState } from "react";
import Spinner from "../../../components/Spinner";
import FetchEmployeeHHA from "../../../controller/user/forms/HHAController";
import HHAFilled from "./employee_hha/HHAFilled";
import HHAForm from "./employee_hha/HHAForm";

export default function HHA() {
  const [HHA, setHHA] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiBase = import.meta.env.VITE_API_URL;
  const [errors, setErrors] = useState({});

  useEffect(() => {
    FetchEmployeeHHA(setHHA, setLoading, apiBase, setErrors);
  }, []);

  const data = HHA?.homeHealthData;
  const fullname = HHA?.profileData;

  return (
    <>
      {loading && <Spinner />} {data ? <HHAFilled data={data} fullname={fullname} /> : <HHAForm fullname={fullname} />}
    </>
  );
}
