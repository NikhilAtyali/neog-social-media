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
    case "LIKE_DISLIKE_POST":
      return {
        ...prevState,
        posts: payload.posts,
        userPosts: payload.posts.filter(
          ({ username }) => username === payload.loggedUsername
        ),
      };
    default:
      return prevState;
  }
};

export const PostProvider = ({ children }) => {
  const { loggedUsername } = useContext(AuthContext);
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
      const responseUserPost = await fetch(`/api/posts/user/${username}`);
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
      const response = await fetch(`/api/posts/${postId}`);
      if (response.status === 200) {
        const responseData = await response.json();
        return responseData.post;
      }
    } catch (e) {
      console.error(e);
    }
  };

  const searchUserDetail = (queryUser) => {
    return postData.users.find(({ username }) => username === queryUser);
  };

  const likePostHandler = async (postId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`/api/posts/like/${postId}`, {
        method: "POST",
        headers: {
          authorization: token,
        },
      });
      if (response.status === 201) {
        const responseData = await response.json();
        dispatch({
          type: "LIKE_DISLIKE_POST",
          payload: {
            posts: responseData.posts,
            loggedUsername: loggedUsername,
          },
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const dislikePostHandler = async (postId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`/api/posts/dislike/${postId}`, {
        method: "POST",
        headers: {
          authorization: token,
        },
      });
      if (response.status === 201) {
        const responseData = await response.json();
        dispatch({
          type: "LIKE_DISLIKE_POST",
          payload: {
            posts: responseData.posts,
            loggedUsername: loggedUsername,
          },
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const toggleLikeHandler = (postId) => {
    const post = postData.posts.find(({ _id }) => _id === postId);
    return post.likes.likedBy.find(
      ({ username }) => username === loggedUsername
    )
      ? dislikePostHandler(postId)
      : likePostHandler(postId);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getUserPost(loggedUsername);
  }, [loggedUsername]);

  return (
    <PostContext.Provider
      value={{
        postData,
        userPosts: postData.userPosts,
        users: postData.users,
        getUserPost,
        getPostDetails,
        searchUserDetail,
        toggleLikeHandler,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};