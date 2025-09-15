import { useEffect, useState } from "react";
import Spinner from "../../../components/Spinner";
import FetchEmployeeInfection from "../../../controller/user/forms/InfectionController";
import InfectionControlFilled from "./infection_control/InfectionControllFilled";
import InfectionControlForms from "./infection_control/InfectionControlForms";

export default function InfectionControl() {
  const [infection, setInfection] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const apiBase = import.meta.env.VITE_API_URL;

  useEffect(() => {
    FetchEmployeeInfection(setInfection, setLoading, setErrors, apiBase);
  }, []);

  const data = infection?.infectionData;
  const fullname = infection?.profileData;

  return (
    <>
      {loading && <Spinner />}
      {data ? (
        <InfectionControlFilled data={data} fullname={fullname} />
      ) : (
        <InfectionControlForms fullname={fullname} />
      )}
    </>
  );
}
