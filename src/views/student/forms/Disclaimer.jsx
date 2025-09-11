import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import FetchDisclaimer from "../../../controller/user/forms/DisclaimerController";
import Spinner from "../../../components/Spinner";
import DisclaimerFilled from "./disclaimer/DisclaimerFilled";
import DisclaimerForm from "./disclaimer/DisclaimerForm";

export default function Disclaimer() {
  const [loading, setLoading] = useState(false);
  const [disclaimer, setDisclaimer] = useState([]);
  const [errors, setErrors] = useState({});
  const apiBase = import.meta.env.VITE_API_URL;

  useEffect(() => {
    FetchDisclaimer(setLoading, setDisclaimer, setErrors, apiBase);
  }, []);

  const data = disclaimer?.disclaimer;
  const fullname = disclaimer?.profileData;

  return (
    <>
      {loading && <Spinner />}
      {data ? (
        <DisclaimerFilled data={disclaimer} fullname={fullname} />
      ) : (
        <DisclaimerForm fullname={fullname} />
      )}
    </>
  );
}
