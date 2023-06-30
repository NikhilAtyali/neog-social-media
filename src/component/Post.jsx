import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import "./Post.css";
export const Post = () => {
  return (
    <>
      <main className="post-container">
        <section className="post-header">
          <div className="post-user">
            <img
              alt="user"
              src="data:image/png;base64,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"
            />
            <div>
              <div className="post-user-detail">
                <p className="post-username">User name</p>
                <p className="post-date">Mar 06 2022</p>
              </div>
              <p className="post-userhandle">@username</p>
            </div>
          </div>
          <div>
            <MoreHorizIcon />
          </div>
        </section>
        <p>
          The post content user has posted certain jibrish and anything that the
          users feels relevant
        </p>
        <section className="post-action-container">
          <div>
            <FavoriteBorderIcon />
            <span>1</span>
          </div>
          <BookmarkBorderIcon />
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