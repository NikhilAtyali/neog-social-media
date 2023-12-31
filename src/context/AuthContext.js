import { createContext, useReducer } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
export const AuthContext = createContext();

const authReducer = (prevState, { type, payload }) => {
  switch (type) {
    case "LOGIN_USER":
      return {
        isLoggedIn: true,
        user: { ...payload.foundUser },
        token: payload.encodedToken,
      };
      case "LOGOUT_USER":
      return {
        isLoggedIn: false,
        user: {},
        token: "",
      };
      case "UPDATE_USER":
      return { ...prevState, user: { ...payload } };
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
        toastHandler(`Welcome ${username}`, "success");
      } else if (response.status === 404) {
        const responseData = await response.json();
        toastHandler(responseData.errors[0], "error");
      } else if (response.status === 401) {
        const responseData = await response.json();
        toastHandler(responseData.errors[0], "error");
      }
    } catch (e) {
      console.error(e);
    }
  };
  const logoutHandler = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT_USER", payload: {} });
    toastHandler("Logout successful", "success");
  };
  const signupHandler = async (event) => {
    event.preventDefault();
    const requestBody = JSON.stringify({
      username: event.target.elements.username.value,
      password: event.target.elements.password.value,
      firstName: event.target.elements.firstname.value,
      lastName: event.target.elements.lastname.value,
      profileImg: "",
      bannerImg: "",
      portfolioURL: "",
      quote: "",
    });
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        body: requestBody,
      });
      console.log(response);
      if (response.status === 201) {
        // const responseData = await response.json();
        // console.log(responseData);
        navigate("/login");
        toastHandler("Account Created.Please login to continue", "success")
      }
      if (response.status === 422) {
        //user already present
        toastHandler(
          "Username already taken please try another username",
          "error"
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const checkLogin = () => {
    return userData.isLoggedIn;
    // return localStorage.getItem("token") !== undefined;
  };
  const updateUserHandler = (updatedUser) => {
    dispatch({ type: "UPDATE_USER", payload: updatedUser });
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
    return userData?.user?.bookmarks?.find((id) => id === postId)
      ? removeBookmarkHandler(postId)
      : addBookmarkHandler(postId);
  };
  const isBookmarked = (postId) => {
    return userData?.user?.bookmark?.find((id) => id === postId);
  };
  const toastHandler = (msg, type) => {
    if (type === "success") {
      toast.success(msg, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (type === "error") {
      toast.error(msg, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast(msg, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  return (
    <AuthContext.Provider
      value={{
        userData,
        user: userData.user,
        loggedUsername: userData.user.username,
        bookmarked: userData.user.bookmarks,
        loginHandler,
        logoutHandler,
        updateUserHandler,
        signupHandler,
        toggleBookmark,
        isBookmarked,
        checkLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};