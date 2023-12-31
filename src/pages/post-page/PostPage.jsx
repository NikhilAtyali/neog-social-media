import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { PostContext } from "../../context/PostContext";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ShareIcon from "@mui/icons-material/Share";
import { Popper } from "@mui/material";
import { Modal } from "../../component/modal/Modal";
import { EditPost } from "../../component/edit-post/EditPost";
import { AuthContext } from "../../context/AuthContext";
import { UserContext } from "../../context/userContext";

export const PostPage = () => {
  const { toggleLikeHandler, isLikedHandler, deletePost } =
    useContext(PostContext);
  const { searchUserDetail } = useContext(UserContext)
  const { toggleBookmark, isBookmarked, loggedUsername } =
    useContext(AuthContext);

  const { postId } = useParams();
  const { getPostDetails } = useContext(PostContext);
  const postDetails = getPostDetails(postId);
  const { _id, content, createdAt, likes,username, mediaURL } = postDetails;

  const { firstName, lastName, profileImg } = searchUserDetail(username);

  const navigate = useNavigate();

  const copyPostUrl = async (postId) => {
    const route = `${window.location.origin}/posts/${postId}`;
    try {
      await navigator.clipboard.writeText(route);
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
  return (
    <>
      <div className="home-container">
        <Modal open={isOpen} close={modalCloseHandler}>
          <EditPost postDetails={postDetails} close={modalCloseHandler} />
        </Modal>
        <main className="post-container">
          <section className="post-header">
            <div className="post-user">
              <img
                alt="user"
                src={profileImg}
                onClick={() => navigate(`/profile/${username}`)}
                style={{ cursor: "pointer" }}
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
                    <button
                      onClick={() => {
                        navigate("/home");
                        deletePost(_id);
                      }}
                    >
                      Delete
                    </button>
                  </li>
                </ul>
              </Popper>
            </div>
          </section>
          <div>
            <p>{content}</p>
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
            {/* <div>
              <ChatBubbleOutlineIcon />
              <span>1</span>
            </div> */}
            <ShareIcon onClick={() => copyPostUrl(_id)} />
          </section>
        </main>
        {/* <section>
          <h3>Comments</h3>
          <ul>
            <li>a</li>
            <li>b</li>
            <li>ff</li>
            <li>f</li>
            <li>f</li>
          </ul>
        </section> */}
      </div>
    </>
  );
};