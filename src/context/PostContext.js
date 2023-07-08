import { createContext, useContext, useEffect, useReducer } from "react";
import { AuthContext } from "./AuthContext";

export const PostContext = createContext();

const postReducer = (prevState, { type, payload }) => {
  switch (type) {
    case "SET_POST":
      return { posts: [...payload] };
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
    case "ADD_POST":
      return {
        ...prevState,
        posts: payload.posts,
        userPosts: [
          payload.posts[payload.posts.length - 1],
          ...prevState.userPosts,
        ],
      };
      case "DELETE_POST":
        return {
          ...prevState,
          posts: prevState.posts.filter(({ _id }) => _id !== payload),
          userPosts: prevState.userPosts.filter(({ _id }) => _id !== payload),
        };
    default:
      return prevState;
  }
};

export const PostProvider = ({ children }) => {
  const { loggedUsername, bookmarked } = useContext(AuthContext);
  const [postData, dispatch] = useReducer(postReducer, {
    posts: [],
    userPosts: [],
  });

  const getData = async () => {
    try {
      const responsePost = await fetch("/api/posts");
      if (responsePost.status === 200) {
        const responseData = await responsePost.json();
        dispatch({ type: "SET_POST", payload: responseData.posts });
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

  const getPostDetails = (postId) => {
    return postData.posts.find(({ _id }) => _id === postId);
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
    const post = postData?.posts?.find(({ _id }) => _id === postId);
    return post?.likes?.likedBy?.find(
      ({ username }) => username === loggedUsername
    )
      ? dislikePostHandler(postId)
      : likePostHandler(postId);
  };
  const getBookmarkedPost = () => {
    return postData?.posts?.filter(({ _id }) =>
      bookmarked?.find((item) => item === _id)
    );
  };
  const getLikedPost = () => {
    return postData?.posts?.filter(({ likes }) =>
      likes?.likedBy?.find(({ username }) => username === loggedUsername)
    );
  };
  const isLikedHandler = (postId) => {
    return postData.posts
      .find(({ _id }) => _id === postId)
      .likes?.likedBy?.find(({ username }) => username === loggedUsername)
      ? true
      : false;
  };

  const getMediaUploadLink = async (media) => {
    if (!media) {
      return "";
    }
    const mediaData = new FormData();
    mediaData.append("file", media);
    mediaData.append("upload_preset", "hangout");
    mediaData.append("cloud_name", "dl6n7lyxy");

    const apiEndPoint =
      media.type.slice(0, 5) === "image"
        ? "https://api.cloudinary.com/v1_1/dl6n7lyxy/image/upload"
        : "https://api.cloudinary.com/v1_1/dl6n7lyxy/video/upload";
    try {
      const response = await fetch(apiEndPoint, {
        method: "post",
        body: mediaData,
      });
      if (response.status === 200) {
        const responseData = await response.json();
        return responseData.url;
      }
    } catch (e) {
      console.error(e);
    }
  };

  const createPost = async (e) => {
    e.preventDefault();
    const postMsg = e.target.elements.postMsg.value.trim();
    const media = e.target.elements.media.files[0];
    const reset = e.target.elements.reset;
    if (postMsg === "" && !media) {
      console.log("entered");
      return;
    }
    if (Math.floor(media?.size * 0.000001) > 4) {
      alert("File Size greater than 4mb");
      return;
    }
    

      const cloudinaryLink = await getMediaUploadLink(media);
      const token = localStorage.getItem("token");
      let mediaData = {};
      if (media?.type.slice(0, 5) === "image") {
        mediaData = {
          images: { imageURL: cloudinaryLink, deleteToken: "" },
          video: { videoURL: "", deleteToken: "" },
        };
      } else {
        mediaData = {
          images: { imageURL: "", deleteToken: "" },
          video: { videoURL: cloudinaryLink, deleteToken: "" },
        };
      }
    const postBody = JSON.stringify({
      postData: {
        content: e.target.elements.postMsg.value,
        mediaURL: mediaData,
      },
    });
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { authorization: token },
        body: postBody,
      });

      if (response.status === 201) {
        const responseData = await response.json();
        dispatch({
          type: "ADD_POST",
          payload: { posts: responseData.posts, user: loggedUsername },
        });
        reset.click();
      }
    } catch (e) {
      console.error(e);
    }
  };
  const deletePost = async (postId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
        headers: {
          authorization: token,
        },
      });
      if (response.status === 201) {
        const responseData = await response.json();
        dispatch({ type: "DELETE_POST", payload: postId });
        console.log(responseData);
      }
    } catch (e) {
      console.error(e);
    }
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
        posts: postData.posts,
        userPosts: postData.userPosts,
        getUserPost,
        createPost,
        getBookmarkedPost,
        getLikedPost,
        getPostDetails,
        deletePost,
        isLikedHandler,
        toggleLikeHandler,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
