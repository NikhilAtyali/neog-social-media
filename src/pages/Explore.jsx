import { useContext } from "react";
import { Post } from "../component/Post";
import { PostContext } from "../context/PostContext";
export const Explore = () => {
  const { posts } = useContext(PostContext);
  return (
    <>
      <div className="home-container">
        {posts.length === 0 ? (
          <p className="text-center">No post to display</p>
        ) : (
          <ul>
            {posts.map((post) => (
              <li key={post._id}>
                <Post postDetails={post} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};