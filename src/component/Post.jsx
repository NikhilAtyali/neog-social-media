import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ShareIcon from "@mui/icons-material/Share";
import "./Post.css";
import { Modal } from "./Modal";
import { useContext, useState } from "react";
import { PostContext } from "../context/PostContext";
import { AuthContext } from "../context/AuthContext";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router";
import { Popper } from "@mui/material";
import { EditPost } from "./EditPost";
export const Post = ({ postDetails }) => {
  const { _id, content, createdAt, likes, username, mediaURL } = postDetails;
  const { toggleLikeHandler, isLikedHandler, deletePost } = useContext(PostContext);
  const { searchUserDetail } = useContext(UserContext);
  const { toggleBookmark, isBookmarked, loggedUsername,toastHandler } =
  useContext(AuthContext);

  const { firstName, lastName, profileImg } = searchUserDetail(username);
  const copyPostUrl = async (postId) => {
    const route = `${window.location.origin}/posts/${postId}`;
    try {
      await navigator.clipboard.writeText(route);
      toastHandler("Post Link Copied");
    } catch (e) {
      console.error(e);
    }
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const handlePopper = (event) => {
    anchorEl === null ? setAnchorEl(event.currentTarget) : setAnchorEl(null);
  };
  const [isOpen, setIsOpen] = useState(false);
  const modalCloseHandler = () => {
    setIsOpen(false);
  };
  const navigate = useNavigate();
  return (
    <>
    <Modal open={isOpen} close={modalCloseHandler}>
    <EditPost postDetails={postDetails} close={modalCloseHandler} />
      </Modal>
      <main className="post-container">
        <section className="post-header">
          <div className="post-user">
          <img
              onClick={() => navigate(`/profile/${username}`)}
              style={{ cursor: "pointer" }}
              alt="user"
              src={profileImg}
            />
            <div>
              <div className="post-user-detail">
                <p className="post-username">{firstName + " " + lastName}</p>
                <p className="post-date">
                  {new Date(createdAt).toDateString().slice(0, 15)}
                </p>
              </div>
              <p className="post-userhandle">@{username}</p>
            </div>
          </div>
          <div style={{ display: loggedUsername === username ? "" : "none" }}>
            <MoreHorizIcon
              style={{ cursor: "pointer" }}
              onClick={handlePopper}
            />
            <Popper
              open={Boolean(anchorEl)}
              onClose={handlePopper}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <ul className="post-update-options">
                <li>
                <button onClick={() => setIsOpen(true)}>Edit</button>
                </li>
                <li>
                <button onClick={() => deletePost(_id)}>Delete</button>
                </li>
              </ul>
            </Popper>
          </div>
        </section>
        
        <div
          className="content-container"
          onClick={() => navigate(`/posts/${_id}`)}
        >
          <p className="post-content">{content}</p>
          {mediaURL?.images?.imageURL === "" ? null : (
            <img
              className="post-media"
              src={mediaURL?.images?.imageURL}
              alt={username}
            />
          )}
          {mediaURL?.video?.videoURL === "" ? null : (
            <video controls width="250" className="post-media" autoPlay>
              <source src={mediaURL?.video?.videoURL} type="video/webm" />

              <source src={mediaURL?.video?.videoURL} type="video/mp4" />
              <p>
                Your browser doesn't support HTML video. Here is a
                <a href={mediaURL?.video?.videoURL}>link to the video</a>{" "}
                instead.
              </p>
            </video>
          )}
        </div>
        <section className="post-action-container">
          <div>
          {isLikedHandler(_id) ? (
              <FavoriteIcon
                className="red"
                onClick={() => toggleLikeHandler(_id)}
              />
            ) : (
              <FavoriteBorderIcon onClick={() => toggleLikeHandler(_id)} />
            )}
            <span>{likes?.likeCount}</span>
          </div>
          {isBookmarked(_id) ? (
            <BookmarkIcon
              onClick={() => toggleBookmark(_id)}
              className="yellow"
            />
          ) : (
            <BookmarkBorderIcon onClick={() => toggleBookmark(_id)} />
          )}
          <div>
            <ChatBubbleOutlineIcon />
            <span>1</span>
          </div>
          <ShareIcon onClick={() => copyPostUrl(_id)}/>
        </section>
      </main>
    </>
  );
};