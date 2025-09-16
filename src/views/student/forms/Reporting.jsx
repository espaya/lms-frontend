import { useEffect, useState } from "react";
import FetchEmployeeReporting from "../../../controller/user/forms/ReportingController";
import Spinner from "../../../components/Spinner";
import ReportingFilled from "./reporting/ReportingFilled";
import ReportingForms from "./reporting/ReportingForms";

export default function Reporting() {
  const [reporting, setReporting] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setError] = useState({});
  const apiBase = import.meta.env.VITE_API_URL;

  useEffect(() => {
    FetchEmployeeReporting(setReporting, setLoading, setError, apiBase);
  }, []);

  const data = reporting?.reportingData;
  const fullname = reporting?.profileData;

  return (
    <>
      {loading && <Spinner />}
      {data ? (
        <ReportingFilled data={data} fullname={fullname} />
      ) : (
        <ReportingForms fullname={fullname} />
      )}
    </>
  );
}
