import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { AuthContext } from "../../context/AuthContext";
import "./UserListing.css";

export const UserListing = ({ users }) => {
  const { isFollowing, toggleFollow } = useContext(UserContext);
  const { loggedUsername } = useContext(AuthContext);
  return (
    <>
      <div className="user-listing-container">
        {users.length === 0 ? (
          <p className="empty-list">No users to display</p>
        ) : (
          <ul className="user-list-parent">
            {users.map(({ _id, profileImg, username, firstName, lastName }) => (
              <div className="user-list-item">
                <img src={profileImg} alt={firstName} />
                <span>{firstName + " " + lastName}</span>
                <button
                  className="user-listing-btn"
                  onClick={() => toggleFollow(_id)}
                  style={{ display: loggedUsername === username ? "none" : "" }}
                >
                  {isFollowing(username) ? "unfollow" : "follow"}
                </button>
              </div>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}