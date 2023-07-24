import { useContext, useEffect, useState } from "react";
import { Post } from "../../component/post/Post"
import { ColorRing } from "react-loader-spinner";
import { PostContext } from "../../context/PostContext";
export const Explore = () => {
  const { posts } = useContext(PostContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  return (
    <>
      <div className="home-container">
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
        ) : posts.length === 0 ? (
          <p className="text-center">No post to display</p>
        ) : (
          <ul>
            {posts
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((post) => (
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