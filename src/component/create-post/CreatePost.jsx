import { useContext, useRef, useState } from "react";
import { PostContext } from "../../context/PostContext";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { EmojiCard } from "../emoji-card/EmojiCard";
import "./CreatePost.css";
export const CreatePost = ({close}) => {
  const [text, setText] = useState("");
  const { createPost } = useContext(PostContext);
  const inputRef = useRef(null);
  const handleClick = () => {
    inputRef.current.click();
  };
  const [fileName, setFileName] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const handleFileChange = (e) => {
    if (e.target.files.length === 0) {
      return;
    }
    setFileName(() => e.target.files[0].name);
  };
  const modalCloseHandler = () => {
    if (close) {
      close();
    }
  };
  return (
    <>
      <form onSubmit={(e) => createPost(e)} className="create-post-form">
      <textarea
          id="postMsg"
          rows={5}
          placeholder="Whats happening?"
          value={text}	
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <div className="home-create-post-actions">
          <section className="create-actions">
            <input
              style={{ display: "none" }}
              ref={inputRef}
              id="media"
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
            />
            <InsertPhotoIcon onClick={handleClick} />
            <EmojiEmotionsIcon />
            <EmojiCard open={showEmoji} value={text} updater={setText} />
            <p>{fileName}</p>
          </section>
          <button type="submit">Post</button>
          <button
            type="reset"
            onClick={() => setFileName("")}
            value={text}	
            onChange={(e) => setText(e.target.value)}
            id="reset"
            style={{ display: "none" }}
          >
            Reset
          </button>
        </div>
      </form>
    </>
  );
};