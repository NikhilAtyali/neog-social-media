import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import "./Post.css";
import { useContext } from "react";
import { PostContext } from "../context/PostContext";
import { AuthContext } from "../context/AuthContext";
export const Post = ({ postDetails }) => {
  const { _id, content, createdAt, likes, username } = postDetails;
  const { searchUserDetail, toggleLikeHandler } = useContext(PostContext);
  const { toggleBookmark } = useContext(AuthContext);

  const { firstName, lastName, profileImg } = searchUserDetail(username);

  return (
    <>
      <main className="post-container">
        <section className="post-header">
          <div className="post-user">
            <img alt="user" src={profileImg} />
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
          <div>
            <MoreHorizIcon />
          </div>
        </section>
        <p>{content}</p>
        <section className="post-action-container">
          <div>
            <FavoriteBorderIcon onClick={() => toggleLikeHandler(_id)} />
            <span>{likes.likeCount}</span>
          </div>
          <BookmarkBorderIcon onClick={() => toggleBookmark(_id)} />
          <div>
            <ChatBubbleOutlineIcon />
            <span>1</span>
          </div>
          <ShareIcon />
        </section>
      </main>
    </>
  );
};