import { useEffect, useState } from "react";
import FetchEmployeeNonCompete from "../../../controller/user/forms/NonCompeteController";
import Spinner from "../../../components/Spinner";
import NonCompeteFilled from "../forms/non_compete/NonCompeteFilled";
import NonCompeteForms from "../forms/non_compete/NonCompeteForms";

export default function NonCompete() {
  const [nonCompete, setNonCompete] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const apiBase = import.meta.env.VITE_API_URL;

  useEffect(() => {
    FetchEmployeeNonCompete(setNonCompete, setErrors, setLoading, apiBase);
  }, []);


  const data = nonCompete?.nonCompete;
  const fullname = nonCompete?.profileData;

  return (
    <>
      {loading && <Spinner />}
      {data ? (
        <NonCompeteFilled data={data} fullname={fullname} />
      ) : (
        <NonCompeteForms fullname={fullname} />
      )}
    </>
  );
}
