import { useContext } from "react";
import { Post } from "../component/Post"
import { PostContext } from "../context/PostContext";
import "./Home.css";
export const Home = () => {
  const { userPosts } = useContext(PostContext);
   
  return (
    <>
      <div className="home-container">
        <ul>
        {userPosts?.map((post) => (
            <li key={post._id}>
              <Post postDetails={post} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
