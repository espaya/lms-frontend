import { useEffect, useState } from "react";
import FetchEmployeeDressCode from "../../../controller/user/forms/DressCodeController";
import Spinner from "../../../components/Spinner";
import EmployeeDressCodeFilled from "./dress_code/EmployeeDressCodeFilled";
import EmployeeDressCodeForm from "./dress_code/EmployeeDressCodeForm";

export default function DressCode() {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [dressCode, setDressCode] = useState([]);

  const apiBase = import.meta.env.VITE_API_URL;

  useEffect(() => {
    FetchEmployeeDressCode(setErrors, setLoading, setDressCode, apiBase);
  }, []);

  const data = dressCode?.dressCode;
  const fullname = dressCode?.profileData;

  return (
    <>
      {loading && <Spinner />}
      {data ? (
        <EmployeeDressCodeFilled data={dressCode} fullname={fullname} />
      ) : (
        <EmployeeDressCodeForm fullname={fullname} />
      )}
    </>
  );
}
