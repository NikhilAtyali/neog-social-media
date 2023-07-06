import { useContext, useState } from "react";
import { Post } from "../component/Post";
import { PostContext } from "../context/PostContext";
import "./Home.css";
import { CreatePost } from "../component/CreatePost";

export const Home = () => {
  const { userPosts } = useContext(PostContext);

  const [filters, setFilters] = useState("");

  const sortHandler = (order) => {
    if (order === "latest") {
      return (a, b) => new Date(b.createdAt) - new Date(a.createdAt);
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
        <CreatePost />
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