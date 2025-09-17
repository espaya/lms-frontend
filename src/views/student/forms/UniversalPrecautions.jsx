import { useEffect, useState } from "react";
import Spinner from "../../../components/Spinner";
import FetchEmployeeUniversalPrecautions from "../../../controller/user/forms/UniversalPrecautionsController";
import UniversalPrecautionsFilled from "./universal_precaution/UniversalPrecautionFilled";
import UniversalPrecautionsForms from "./universal_precaution/UniversalPrecautionForms";

export default function UniversalPrecautions() {
  const [precautions, setPrecautions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const apiBase = import.meta.env.VITE_API_URL;

  useEffect(() => {
    FetchEmployeeUniversalPrecautions(
      setPrecautions,
      setLoading,
      setErrors,
      apiBase
    );
  }, []);

  const data = precautions?.precautionsData;
  const fullname = precautions?.profileData;

  return (
    <>
      {loading && <Spinner />}
      {data ? (
        <UniversalPrecautionsFilled data={data} fullname={fullname} />
      ) : (
        <UniversalPrecautionsForms fullname={fullname} />
      )}
    </>
  );
}
