import { useEffect, useState } from "react";
import FetchDrugTesting from "../../../controller/user/forms/DrugTestingController";
import Spinner from "../../../components/Spinner";
import DrugTestingFilled from "./drug_testing/DrugTestingFilled";
import DrugTestingForms from "./drug_testing/DrugTestingForms";

export default function DrugTesting() {
  const [loading, setLoading] = useState(false);
  const apiBase = import.meta.env.VITE_API_URL;
  const [drugTesting, setDrugTesting] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    FetchDrugTesting(apiBase, setErrors, setLoading, setDrugTesting);
  }, []);

  const data = drugTesting?.drugTesting;
  const fullname = drugTesting?.profileData;

  return (
    <>
      {loading && <Spinner />}
      {data ? (
        <DrugTestingFilled data={drugTesting} fullname={fullname} />
      ) : (
        <DrugTestingForms fullname={fullname} />
      )}
    </>
  );
}
