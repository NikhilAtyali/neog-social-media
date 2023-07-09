import { useContext, useState } from "react";
import "./Search.css";
import { UserContext } from "../context/userContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";
export const Search = () => {
  const { users } = useContext(UserContext);
  const { loggedUsername } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");

  let searchedResult = users.filter(
    ({ username, firstName, lastName }) =>
      (username !== loggedUsername && username.includes(searchQuery)) ||
      firstName.includes(searchQuery) ||
      lastName.includes(searchQuery)
  );
  const navigate = useNavigate();

  return (
    <>
      <div className="search-container">
        <input
          type="search"
          className="search-input"
          placeholder="Search User"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div
          className="search-result"
          style={{ display: searchQuery === "" ? "none" : "" }}
        >
          <ul>
            {searchedResult.length === 0 ? (
              <li>
                <p>No user found!</p>
              </li>
            ) : (
              searchedResult.map(({ profileImg, username },i) => (
                <li
                key={i}
                  onClick={() => {
                    navigate(`/profile/${username}`);
                    setSearchQuery("");
                  }}
                >
                  <img src={profileImg} alt={username} /> <p>{username}</p>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </>
  );
};