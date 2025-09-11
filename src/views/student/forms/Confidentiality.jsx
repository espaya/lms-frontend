import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import FetchConfidentiality from "../../../controller/user/forms/ConfidentialityController";
import Spinner from "../../../components/Spinner";
import ConfidentialityFilled from "./confidentiality/ConfidentialityFilled";
import ConfidentialityForms from "./confidentiality/ConfidentialityForms";

export default function Confidentiality() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const apiBase = import.meta.env.VITE_API_URL;
  const [confidentiality, setConfidentiality] = useState([]);

  useEffect(() => {
    FetchConfidentiality(setLoading, setErrors, apiBase, setConfidentiality);
  }, []);

  const confidentialityOfAgreement =
    confidentiality?.confidentiality?.signature;

  return (
    <>
      {loading && <Spinner />}
      {confidentialityOfAgreement ? (
        <ConfidentialityFilled data={confidentiality} />
      ) : (
        <ConfidentialityForms />
      )}
    </>
  );
}
