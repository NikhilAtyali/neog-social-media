import { useContext } from "react";
import { PostContext } from "../../context/PostContext";
import { Post } from "../../component/post/Post";

export const Liked = () => {
  const { getLikedPost } = useContext(PostContext);
  const posts = getLikedPost();

  return (
    <>
      <h2 className="text-center">Liked Post</h2>
      <div className="home-container">
        {posts.length === 0 ? (
          <p className="text-center">No Liked Post</p>
        ) : (
          <ul className="post-listing">
          {posts.map((post) => (
            <li className="post-listing-item" key={post._id}>
                <Post postDetails={post} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};