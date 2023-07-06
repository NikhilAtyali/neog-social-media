import { useContext } from "react";
import { useParams } from "react-router";
import { PostContext } from "../context/PostContext";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ShareIcon from "@mui/icons-material/Share";
import { AuthContext } from "../context/AuthContext";
import { UserContext } from "../context/userContext";

export const PostPage = () => {
  const { toggleLikeHandler, isLikedHandler } = useContext(PostContext);
  const { searchUserDetail } = useContext(UserContext);
  const { toggleBookmark, isBookmarked } = useContext(AuthContext);

  const { postId } = useParams();
  const { getPostDetails } = useContext(PostContext);
  const { _id, content, createdAt, likes, username } = getPostDetails(postId);
  const { firstName, lastName, profileImg } = searchUserDetail(username);
  const copyPostUrl = async (postId) => {
    const route = `${window.location.origin}/posts/${postId}`;
    try {
      await navigator.clipboard.writeText(route);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      <div className="home-container">
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
          <div>
            <p>{content}</p>
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
            <ShareIcon onClick={() => copyPostUrl(_id)} />
          </section>
        </main>
        <section>
          <h3>Comments</h3>
          <ul>
            <li>a</li>
            <li>b</li>
            <li>ff</li>
            <li>f</li>
            <li>f</li>
          </ul>
        </section>
      </div>
    </>
  );
};