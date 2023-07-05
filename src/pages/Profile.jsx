import { useContext } from "react";
import { UserContext } from "../context/userContext"
import { useParams } from "react-router";
import LogoutIcon from "@mui/icons-material/Logout";
import "./Profile.css";
import { AuthContext } from "../context/AuthContext";
export const Profile = () => {
  const { searchUserDetail, toggleFollow, shouldFollowEnable, isFollowing } =
    useContext(UserContext);
  const { logoutHandler } = useContext(AuthContext);
  const { username } = useParams();
  //   console.log(searchUserDetail(username));
  const {
    _id,
    firstName,
    lastName,
    profileImg,
    bannerImg,
    quote,
    followers,
    following,
  } = searchUserDetail(username);
  return (
    <>
      <div className="home-container">
        <section className="profile-container">
          <img
            src={bannerImg}
            alt="banner"
            className="profile-background-image"
          />
          <div className="profile-image">
            <img alt="user" src={profileImg} />
            <button
              style={{ display: !shouldFollowEnable(username) && "none" }}
              onClick={() => toggleFollow(_id)}
            >
              {isFollowing(username) ? "Following" : "Follow"}
            </button>
          </div>

          <div className="profile-header">
            <div>
              <p className="profile-name">{firstName + " " + lastName}</p>
              <p className="profile-username">@{username}</p>
            </div>
            <div
              className="profile-actions"
              style={{ display: shouldFollowEnable(username) && "none" }}
            >
              <button>Edit Profile</button>
              <LogoutIcon
                className="profile-logout"
                onClick={() => logoutHandler()}
              />
            </div>
          </div>

          <div>
            <p className="profile-quote">{quote}</p>
            <div className="profile-links">
              <a
                target="_blank"
                href="https://github.com/Amankumar62"
                rel="noreferrer"
              >
                https://www.something.com
              </a>
            </div>
          </div>
          <div className="profile-popularity">
            <span>5 Posts</span>
            <span>{followers.length} Followers</span>
            <span>{following.length} Following</span>
          </div>
        </section>
      </div>
    </>
  );
};