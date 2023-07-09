import { useContext } from "react";
import "./SuggestionBar.css";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router";
export const SuggestionBar = () => {
  const { getPotentialFollowUser, toggleFollow } = useContext(UserContext);
  const users = getPotentialFollowUser();
  const navigate = useNavigate();
  return (
    <>
      <div className="suggestion-container">
        <h3 className="suggestion-heading">Suggestions for you</h3>
        <ul>
          {users.map(({ _id, profileImg, username, firstName, lastName }) => (
            <li key={_id}>
              <img
                src={profileImg}
                alt="user"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/profile/${username}`)}
              />
              <p
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/profile/${username}`)}
              >
                {firstName + " " + lastName}
              </p>
              <button
                className="suggestion-follow-btn"
                onClick={() => toggleFollow(_id)}
              >
                Follow
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
