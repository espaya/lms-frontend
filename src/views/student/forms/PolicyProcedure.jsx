import { useEffect, useState } from "react";
import FetchEmployeePolicyProcedure from "../../../controller/user/forms/PolicyprocedureController";
import Spinner from "../../../components/Spinner";
import PolicyProcedureFilled from "./policy_procedure/PolicyProcedureFilled";
import PolicyProcedureForms from "./policy_procedure/PolicyProcedureForms";

export default function PolicyProcedure() {
  const [policy, setPolicy] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const apiBase = import.meta.env.VITE_API_URL;

  useEffect(() => {
    FetchEmployeePolicyProcedure(setPolicy, setErrors, setLoading, apiBase);
  }, []);

  const data = policy?.policy;
  const fullname = policy?.profileData;

  return (
    <>
      {loading && <Spinner />}
      {data ? (
        <PolicyProcedureFilled data={data} fullname={fullname} />
      ) : (
        <PolicyProcedureForms fullname={fullname} />
      )}
    </>
  );
}
