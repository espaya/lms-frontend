import { useEffect, useState } from "react";
import FetchEmployeeVerification from "../../../controller/user/forms/VerificationController";
import Spinner from "../../../components/Spinner";
import VerificationFilled from "./verification/VerificationFilled";
import VerificationForms from "./verification/VerificationForms";

export default function Verification() {
  const [verification, setVerification] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const apiBase = import.meta.env.VITE_API_URL;

  useEffect(() => {
    FetchEmployeeVerification(setVerification, setLoading, setErrors, apiBase);
  }, []);

  const data = verification?.verificationData;
  const fullname = verification?.profileData;

  return (
    <>
      {loading && <Spinner />}
      {data ? (
        <VerificationFilled data={data} fullname={fullname} />
      ) : (
        <VerificationForms fullname={fullname} />
      )}
    </>
  );
}
