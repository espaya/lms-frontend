import { useEffect, useState } from "react";
import FetchEmployeeSexualHarassment from "../../../controller/user/forms/SexualHarassmentController";
import Spinner from "../../../components/Spinner";
import SexualHarassmentFilled from "./sexual_harassment/SexualHarassmentFilled";
import SexualHarassmentForms from "./sexual_harassment/SexualHarassmentForms";

export default function SexualHarassment() {
  const [sexual, setSexual] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const apiBase = import.meta.env.VITE_API_URL;

  useEffect(() => {
    FetchEmployeeSexualHarassment(setSexual, setErrors, setLoading, apiBase);
  }, []);

  const data = sexual?.sexualData;
  const fullname = sexual?.profileData;

  return (
    <>
      {loading && <Spinner />}
      {data ? (
        <SexualHarassmentFilled data={data} fullname={fullname} />
      ) : (
        <SexualHarassmentForms fullname={fullname} />
      )}
    </>
  );
}
