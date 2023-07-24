import { useContext } from "react";
import { PostContext } from "../../context/PostContext";
import { Post } from "../../component/post/Post";

export const Bookmark = () => {
  const { getBookmarkedPost } = useContext(PostContext);

  const posts = getBookmarkedPost();
  return (
    <>
      <h2 className="text-center">Bookmarked Post</h2>
      <div className="home-container">
        {posts.length === 0 ? (
          <p className="text-center">No Bookmarked Post</p>
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