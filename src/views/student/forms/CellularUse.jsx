import { useEffect, useState } from "react";
import FetchCellularUse from "../../../controller/user/forms/CellularUseController";
import Spinner from "../../../components/Spinner";
import CellularUseFilled from "./cellular_use/CellularUseFilled";
import CellularUseForms from "./cellular_use/CellularUseForms";

export default function CellularUse() {
  const [cellular, setCellular] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const apiBase = import.meta.env.VITE_API_URL;

  useEffect(() => {
    FetchCellularUse(setCellular, setLoading, setErrors, apiBase);
  }, []);

  const data = cellular?.empSafety;
  const fullname = cellular?.profileData;

  return (
    <>
      {loading && <Spinner />}
      {data ? (
        <CellularUseFilled data={cellular} fullname={fullname} />
      ) : (
        <CellularUseForms fullname={fullname} />
      )}
    </>
  );
}
