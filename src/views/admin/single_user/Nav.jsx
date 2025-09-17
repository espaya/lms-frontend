import { useLocation, useNavigate } from "react-router-dom";
import { PATHS } from "../../../router";

export default function Nav({ username }) {
  const location = useLocation();
  const navigate = useNavigate();

  const profilePath = PATHS.SINGLE_USER.replace(":username", username);
  const quizzesPath = PATHS.SINGLE_USER_QUIZZES.replace(":username", username);
  const formsPath = PATHS.SINGLE_USER_FORMS.replace(":username", username);

  return (
    <div className="col-md-3">
      <ul className="settings-menu">
        <li className={location.pathname === profilePath ? "active" : ""}>
          <a
            onClick={() => navigate(profilePath)}
            style={{ cursor: "pointer" }}
          >
            <i className="ri-arrow-right-s-line" />
            Profile
          </a>
        </li>

        <li className={location.pathname === quizzesPath ? "active" : ""}>
          <a
            onClick={() => navigate(quizzesPath)}
            style={{ cursor: "pointer" }}
          >
            <i className="ri-arrow-right-s-line" />
            Quizzes
          </a>
        </li>

        <li className={location.pathname === formsPath ? "active" : ""}>
          <a onClick={() => navigate(formsPath)} style={{ cursor: "pointer" }}>
            <i className="ri-arrow-right-s-line" />
            Forms
          </a>
        </li>
      </ul>
    </div>
  );
}
