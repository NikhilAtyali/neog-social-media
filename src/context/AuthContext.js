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
        dispatch({ type: "LOGIN_USER", payload: responseData });
        console.log(responseData);
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

  // const getBookmarkPost = async () => {
  //   const token = localStorage.getItem("token");
  //   try {
  //     const response = fetch("/api/users/bookmark/", {
  //       method: "GET",
  //       header: {
  //         authorization: token,
  //       },
  //     });
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  return (
    <AuthContext.Provider
      value={{
        userData,
        username: userData.user.username,
        loginHandler,
        signupHandler,
        checkLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};