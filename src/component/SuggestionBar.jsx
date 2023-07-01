import { useContext } from "react";
import "./SuggestionBar.css";
import { PostContext } from "../context/PostContext";
import { AuthContext } from "../context/AuthContext";
export const SuggestionBar = () => {
  const { users } = useContext(PostContext);
  const { loggedUsername } = useContext(AuthContext);
  return (
    <>
      <div className="suggestion-container">
        <h3 className="suggestion-heading">Suggestions for you</h3>
        <ul>
          {users
            .filter(({ username }) => username !== loggedUsername)
            .map(({ _id, profileImg, username }) => (
              <li key={_id}>
                <img src={profileImg} alt="user" />
                <p>{username}</p>
                <button>Follow</button>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};