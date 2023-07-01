import { createContext, useContext, useEffect, useReducer } from "react";
import { AuthContext } from "./AuthContext";

export const PostContext = createContext();

const postReducer = (prevState, { type, payload }) => {
  switch (type) {
    case "SET_POST":
      return { posts: [...payload] };
    case "SET_USERS":
      return { ...prevState, users: [...payload] };
    case "SET_USER_POST":
      return { ...prevState, userPosts: [...payload] };
    default:
      return prevState;
  }
};

export const PostProvider = ({ children }) => {
  const { username } = useContext(AuthContext);
  const [postData, dispatch] = useReducer(postReducer, {
    posts: [],
    users: [],
    userPosts: [],
  });

  const getData = async () => {
    try {
      const responsePost = await fetch("/api/posts");
      const responseUser = await fetch("/api/users");
      if (responsePost.status === 200) {
        const responseData = await responsePost.json();
        dispatch({ type: "SET_POST", payload: responseData.posts });
      }
      if (responseUser.status === 200) {
        const responseUserData = await responseUser.json();
        dispatch({ type: "SET_USERS", payload: responseUserData.users });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getUserPost = async (username) => {
    try {
      const responseUserPost = await fetch(`/api/posts/user/:${username}`);
      if (responseUserPost.status === 200) {
        const responseData = await responseUserPost.json();
        dispatch({ type: "SET_USER_POST", payload: responseData.posts });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getPostDetails = async (postId) => {
    try {
      const response = await fetch(`/api/posts/:${postId}`);
      if (response.status === 200) {
        const responseData = await response.json();
        return responseData.post;
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getUserDetail = async (userId) => {
    try {
      const response = await fetch(`/api/users/:${userId}`);
      if (response.status === 200) {
        const responseData = await response.json();
        return responseData.user;
      }
    } catch (e) {}
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getUserPost(username);
  }, [username]);

  return (
    <PostContext.Provider
      value={{ postData, getUserPost, getPostDetails, getUserDetail }}
    >
      {children}
    </PostContext.Provider>
  );
};