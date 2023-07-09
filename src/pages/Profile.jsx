import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { useParams } from "react-router";
import { Post } from "../component/Post";
import LogoutIcon from "@mui/icons-material/Logout";
import "./Profile.css";
import { AuthContext } from "../context/AuthContext";
import { Modal } from "../component/Modal";
import { EditProfile } from "../component/EditProfile";
export const Profile = () => {
  const { searchUserDetail, toggleFollow, shouldFollowEnable, isFollowing } =
    useContext(UserContext);
  const { logoutHandler } = useContext(AuthContext);
  const { username } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const userDetail = searchUserDetail(username);
  const modalCloseHandler = () => {
    setIsOpen(false);
  };
  const {
    _id,
    firstName,
    lastName,
    profileImg,
    bannerImg,
    quote,
    followers,
    portfolioURL,
    following,
  } = userDetail;
  const [userPosts, setUserPosts] = useState([]);

  const getUserPost = async () => {
    try {
      const response = await fetch(`/api/posts/user/${username}`);
      if (response.status === 200) {
        const responseData = await response.json();
        setUserPosts(responseData.posts);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getUserPost();
  }, [username]);
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
              <button onClick={() => setIsOpen(true)}>Edit Profile</button>
              <Modal open={isOpen} close={modalCloseHandler}>
                <EditProfile
                  userDetail={userDetail}
                  close={modalCloseHandler}
                />
              </Modal>
              <LogoutIcon
                className="profile-logout"
                onClick={() => logoutHandler()}
              />
            </div>
          </div>

          <div>
            <p className="profile-quote">{quote}</p>
            <div className="profile-links">
              <a target="_blank" href={portfolioURL} rel="noreferrer">
                {portfolioURL}
              </a>
            </div>
          </div>
          <div className="profile-popularity">
            <span>{userPosts.length} Posts</span>
            <span>{followers.length} Followers</span>
            <span>{following.length} Following</span>
          </div>
        </section>
        <div className="profile-user-posts">
          <ul>
            {userPosts?.map((post) => (
              <li key={post._id}>
                <Post postDetails={post} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};