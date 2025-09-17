import { useEffect, useState } from "react";
import FetchEmployeeDisclosure from "../../../controller/user/forms/DisclosureController";
import Spinner from "../../../components/Spinner";
import DisclosureFilled from "./disclosure/DisclosureFilled";
import DisclosureForms from "./disclosure/DisclosureForms";

export default function Disclosure() {
  const [disclosure, setDisclosure] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const apiBase = import.meta.env.VITE_API_URL;

  useEffect(() => {
    FetchEmployeeDisclosure(setDisclosure, setLoading, setErrors, apiBase);
  }, []);

  const data = disclosure?.sworn;
  const position = disclosure?.position;
  const fullname = disclosure?.profileData;

  return (
    <>
      {loading && <Spinner />}
      {data ? (
        <DisclosureFilled data={data} position={position} fullname={fullname} />
      ) : (
        <DisclosureForms fullname={fullname} position={position} />
      )}
    </>
  );
}
