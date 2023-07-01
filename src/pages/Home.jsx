import { Post } from "../component/Post"
import "./Home.css";
export const Home = () => {
   
  return (
    <>
      <div className="home-container">
        <ul>
          <li>
            <Post />
          </li>
          <li>
            <Post />
          </li>
          <li>
            <Post />
          </li>
          <li>
            <Post />
          </li>
          <li>
            <Post />
          </li>
          <li>
            <Post />
          </li>
          <li>
            <Post />
          </li>
        </ul>
      </div>
    </>
  );
};
