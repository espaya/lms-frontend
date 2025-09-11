import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Spinner from "../../../components/Spinner";
import FetchCriminal from "../../../controller/user/forms/CriminalController";
import CriminalFilled from "./criminal/CriminalFilled";
import CriminalForms from "./criminal/CriminalForms";

export default function Criminal() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [criminal, setCriminal] = useState([]);
  const apiBase = import.meta.env.VITE_API_URL;

  useEffect(() => {
    FetchCriminal(setLoading, setErrors, setCriminal, apiBase);
  }, []);

  const criminalHistory = criminal?.criminalHistory?.signature;
  const fullname = criminal.profileData?.full_name || "";

  return (
    <>
      {loading && <Spinner />}
      {criminalHistory ? <CriminalFilled data={criminal} /> : <CriminalForms fullname={fullname} />}
    </>
  );
}
