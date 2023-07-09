import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { UserListing } from "../component/UserListing";
import { useParams } from "react-router";
import { Post } from "../component/Post";
import LogoutIcon from "@mui/icons-material/Logout";
import "./Profile.css";
import { AuthContext } from "../context/AuthContext";
import { Modal } from "../component/Modal";
import { EditProfile } from "../component/EditProfile";
import { ColorRing } from "react-loader-spinner";
import { PostContext } from "../context/PostContext";
export const Profile = () => {
  const { searchUserDetail, toggleFollow, shouldFollowEnable, isFollowing } =
    useContext(UserContext);
    const { filterUserPost } = useContext(PostContext);
  const { logoutHandler } = useContext(AuthContext);
  const { username } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [showFollow, setShowFollow] = useState(false);
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
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [username]);
  useEffect(() => {
    isOpen && (document.body.style.overflow = "hidden");
    !isOpen && (document.body.style.overflow = "unset");
  }, [isOpen]);
  useEffect(() => {
    showFollow && (document.body.style.overflow = "hidden");
    !showFollow && (document.body.style.overflow = "unset");
  }, [showFollow]);
  const userPosts = filterUserPost(username);
  return (
    <>
      <div className="home-container">
      <Modal open={showFollow} close={() => setShowFollow(false)}>
          <UserListing users={list} />
        </Modal>
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
            <span
              className="clickable"
              onClick={() => {
                setList(followers);
                setShowFollow(true);
              }}
            >
              {followers.length} Followers
            </span>
            <span
              className="clickable"
              onClick={() => {
                setList(following);
                setShowFollow(true);
              }}
            >
              {following.length} Following
            </span>
          </div>
        </section>
        <div className="profile-user-posts">
        {isLoading ? (
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
          ) : (
            <ul>
              {userPosts.length === 0 ? (
                <p style={{ fontSize: "1.2rem", marginTop: "1rem" }}>
                  Nothing posted yet
                </p>
              ) : (
                userPosts?.map((post) => (
                  <li key={post._id}>
                    <Post postDetails={post} />
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};