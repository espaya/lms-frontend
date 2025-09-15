import { useState } from "react";
import FetchEmployeeVerification from "../../../controller/user/forms/VerificationController";
import Spinner from "../../../components/Spinner";

export default function Verification() {
  const [verification, setVerification] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const apiBase = import.meta.env.VITE_API_URL;

//   FetchEmployeeVerification(setVerification, setLoading, setErrors, apiBase);

  return <> { loading && <Spinner/> } </>;
}
