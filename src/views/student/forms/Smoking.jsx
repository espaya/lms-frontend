import { useEffect, useState } from "react";
import Spinner from "../../../components/Spinner";
import FetchEmployeeSmoking from "../../../controller/user/forms/SmokingController";
import SmokingFilled from "./smoking/SmokingFilled";
import SmokingForms from "./smoking/SmokingForms";

export default function Smoking() {
  const [smoking, setSmoking] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const apiBase = import.meta.env.VITE_API_URL;

  useEffect(() => {
    FetchEmployeeSmoking(setSmoking, setLoading, setErrors, apiBase);
  }, []);

  const data = smoking?.smoking;

  const fullname = smoking?.profileData;

  return (
    <>
      {loading && <Spinner />}
      {data ? (
        <SmokingFilled data={data} fullname={fullname} />
      ) : (
        <SmokingForms fullname={fullname} />
      )}
    </>
  );
}
