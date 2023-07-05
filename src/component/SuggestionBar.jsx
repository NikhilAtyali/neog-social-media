import { useContext } from "react";
import "./SuggestionBar.css";
import { UserContext } from "../context/userContext";
export const SuggestionBar = () => {
  const { getPotentialFollowUser, toggleFollow } = useContext(UserContext);
  const users = getPotentialFollowUser();
  return (
    <>
      <div className="suggestion-container">
        <h3 className="suggestion-heading">Suggestions for you</h3>
        <ul>
        {users.map(({ _id, profileImg, username }) => (
            <li key={_id}>
              <img src={profileImg} alt="user" />
              <p>{username}</p>
              <button onClick={() => toggleFollow(_id)}>Follow</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};