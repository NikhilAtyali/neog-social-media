import { useContext, useState } from "react";
import { PostContext } from "../../context/PostContext";
import { EmojiCard } from "../emoji-card/EmojiCard";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import "./EditPost.css";
export const EditPost = ({ postDetails, close }) => {
  const { _id, content } = postDetails;
  const { editPost } = useContext(PostContext);
  const [textContent, setTextContent] = useState(content);
  const [showEmoji, setShowEmoji] = useState(false);
  const submitHandler = (e, _id) => {
    const status = editPost(e, _id);
    if (status) {
      close();
    }
  };
  return (
    <>
      <form
        onSubmit={(e) => submitHandler(e, _id)}
        className="edit-post-container"
      >
        <textarea
          id="postMsgEdit"
          placeholder="Whats happening?"
          rows={5}
          value={textContent}
          onChange={(e) => setTextContent(e.target.value)}
          style={{ resize: "none" }}
        ></textarea>
        <div className="home-create-post-actions">
          <section className="create-actions">
          <EmojiEmotionsIcon onClick={() => setShowEmoji(!showEmoji)} />
            <div className="edit-post-emoji">
              <EmojiCard
                open={showEmoji}
                value={textContent}
                updater={setTextContent}
              />
            </div>
          </section>
          <button type="submit">Edit</button>
          <button type="reset" id="editreset" style={{ display: "none" }}>
            Reset
          </button>
        </div>
      </form>
    </>
  );
};