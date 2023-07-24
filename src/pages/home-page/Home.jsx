import { useContext, useState,useEffect } from "react";
import { Post } from "../../component/post/Post";
import { ColorRing } from "react-loader-spinner";
import { PostContext } from "../../context/PostContext";
import "./Home.css";
import { CreatePost } from "../../component/create-post/CreatePost";

export const Home = () => {
  const { userPosts } = useContext(PostContext);

  const [filters, setFilters] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const sortHandler = (order) => {
    if (order === "latest") {
      return (a, b) => new Date(b.createdAt) - new Date(a.createdAt);
    } else {
      return (a, b) => b.likes.likeCount - a.likes.likeCount;
    }
  };
  let filteredPost = userPosts;
  console.log(filteredPost, "filteredPost");
  if (filters === "latest") {
    filteredPost = userPosts.sort(sortHandler("latest"));
  } else if (filters === "trending") {
    filteredPost = userPosts.sort(sortHandler("trending"));
  }
  console.log(filteredPost);
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
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
          <ul className="post-listing">
            {filteredPost.length === 0 ? (
              <p style={{ marginTop: "2rem" }}>Nothing posted Yet</p>
            ) : (
              filteredPost?.map((post) => (
                <li className="post-listing-item" key={post._id}>
                  <Post postDetails={post} />
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </>
  );
};