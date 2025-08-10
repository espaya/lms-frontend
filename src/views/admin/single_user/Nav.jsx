import { NavLink, useLocation, useParams } from "react-router-dom";
import { PATHS } from "../../../router";

export default function Nav({ username }) {
  const location = useLocation();

  return (
    <div className="col-md-3">
      <ul className="settings-menu">
        <li
          className={
            location.pathname ===
            PATHS.SINGLE_USER.replace(":username", username)
              ? "active"
              : ""
          }
        >
          <NavLink to={PATHS.SINGLE_USER.replace(":username", username)}>
            <i className="ri-arrow-right-s-line" />
            Profile
          </NavLink>
        </li>

        <li
          className={
            location.pathname ===
            PATHS.SINGLE_USER_QUIZZES.replace(":username", username)
              ? "active"
              : ""
          }
        >
          <NavLink
            to={PATHS.SINGLE_USER_QUIZZES.replace(":username", username)}
          >
            <i className="ri-arrow-right-s-line" />
            Quizzes
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
