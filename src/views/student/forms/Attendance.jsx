import { useEffect, useState, useRef } from "react";
import FetchAttendance from "../../../controller/user/forms/AttendanceController";
import AttendanceFilled from "./attendance/AttendanceFilled";
import AttendanceForms from "./attendance/AttendanceForm";
import Spinner from "../../../components/Spinner";

export default function Attendance() {
  const apiBase = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [formData, setFormData] = useState({});
  const [attendance, getAttendance] = useState([]);

  useEffect(() => {
    FetchAttendance(apiBase, setLoading, setErrors, getAttendance);
  }, []);

  const attendanceData = attendance?.attendanceData?.signature;
  const profileData = attendance.profileData;

  return (
    <>
      {loading && <Spinner />}
      {attendanceData && profileData ? (
        <AttendanceFilled data={attendance} />
      ) : (
        <AttendanceForms />
      )}
    </>
  );
}
