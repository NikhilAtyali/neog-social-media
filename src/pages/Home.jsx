import { useContext, useState } from "react";
import { Post } from "../component/Post";
import { PostContext } from "../context/PostContext";
import "./Home.css";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

export const Home = () => {
  const { userPosts, createPost } = useContext(PostContext);

  const [filters, setFilters] = useState("");

  const sortHandler = (order) => {
    if (order === "latest") {
      return (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt);
    } else {
      return (a, b) => b.likes.likeCount - a.likes.likeCount;
    }
  };
  let filteredPost = userPosts;
  if (filters === "latest") {
    filteredPost = userPosts.sort(sortHandler("latest"));
  } else if (filters === "trending") {
    filteredPost = userPosts.sort(sortHandler("trending"));
  }
  console.log(filteredPost);
  return (
    <>
      <div className="home-container">
        <div className="home-create-post-container">
          <textarea rows={5}></textarea>

          <div className="home-create-post-actions">
            <section>
              <InsertPhotoIcon />
              <EmojiEmotionsIcon />
            </section>
            <button onClick={() => createPost()}>Post</button>
          </div>
        </div>
        <div className="home-post-filter">
          <button onClick={() => setFilters("latest")}>Latest</button>
          <hr />
          <button onClick={() => setFilters("trending")}>Trending</button>
        </div>
        <ul>
          {filteredPost?.map((post) => (
            <li key={post._id}>
              <Post postDetails={post} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};