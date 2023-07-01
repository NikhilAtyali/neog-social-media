import { createContext, useReducer } from "react";
import { useNavigate } from "react-router";
export const AuthContext = createContext();

const authReducer = (prevState, { type, payload }) => {
  switch (type) {
    case "LOGIN_USER":
      return {
        isLoggedIn: true,
        user: { ...payload.foundUser },
        token: payload.encodedToken,
      };
    case "UPDATE_BOOKMARK":
      return {
        ...prevState,
        user: { ...prevState.user, bookmarks: [...payload] },
      };
    default:
      return prevState;
  }
};

export const AuthProvider = ({ children }) => {
  const [userData, dispatch] = useReducer(authReducer, {
    isLoggedIn: false,
    user: {},
    token: "",
  });
  const navigate = useNavigate();

  const loginHandler = async (e, username, password) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password,
    };
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (response.status === 200) {
        const responseData = await response.json();
        localStorage.setItem("token", responseData.encodedToken);
        dispatch({ type: "LOGIN_USER", payload: responseData });
        navigate("/home");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const signupHandler = async (event) => {
    event.preventDefault();
    try {
      //   const response = fetch("/api/auth/signup", {
      //     method: "POST",
      //     body: {},
      //   });
    } catch (e) {
      console.error(e);
    }
  };

  const checkLogin = () => {
    return userData.isLoggedIn;
  };

  const addBookmarkHandler = async (postId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`/api/users/bookmark/${postId}`, {
        method: "POST",
        headers: {
          authorization: token,
        },
      });
      if (response.status === 200) {
        const responseData = await response.json();
        dispatch({
          type: "UPDATE_BOOKMARK",
          payload: responseData.bookmarks,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const removeBookmarkHandler = async (postId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`/api/users/remove-bookmark/${postId}`, {
        method: "POST",
        headers: {
          authorization: token,
        },
      });
      if (response.status === 200) {
        const responseData = await response.json();
        dispatch({ type: "UPDATE_BOOKMARK", payload: responseData.bookmarks });
      }
    } catch (e) {
      console.error(e);
    }
  };
  const toggleBookmark = (postId) => {
    return userData.user.bookmarks.find((id) => id === postId)
      ? removeBookmarkHandler(postId)
      : addBookmarkHandler(postId);
  };

  return (
    <AuthContext.Provider
      value={{
        userData,
        loggedUsername: userData.user.username,
        loginHandler,
        signupHandler,
        toggleBookmark,
        checkLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};