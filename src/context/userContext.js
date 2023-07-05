import { createContext, useContext, useEffect, useReducer } from "react";
import { AuthContext } from "./AuthContext";

export const UserContext = createContext();
const usersReducer = (prevState, { type, payload }) => {
  switch (type) {
    case "SET_USERS":
      return { ...prevState, users: [...payload] };
    case "UPDATE_USER":
      return {
        ...prevState,
        users: [
          ...prevState.users.map((item) => {
            if (item._id === payload.follower._id) {
              return payload.follower;
            } else if (item._id === payload.following._id) {
              return payload.following;
            } else return item;
          }),
        ],
      };
    default:
      return prevState;
  }
};

export const UserProvider = ({ children }) => {
  const [usersData, dispatch] = useReducer(usersReducer, { users: [] });
  const { updateUserHandler, loggedUsername } = useContext(AuthContext);

  const getUsersData = async () => {
    try {
      const responseUser = await fetch("/api/users");
      if (responseUser.status === 200) {
        const responseUserData = await responseUser.json();
        dispatch({ type: "SET_USERS", payload: responseUserData.users });
      }
    } catch (e) {
      console.error(e);
    }
  };
  const searchUserDetail = (queryUser) => {
    return usersData.users.find(({ username }) => username === queryUser);
  };
  const followUserHandler = async (userId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`/api/users/follow/${userId}`, {
        method: "POST",
        headers: {
          authorization: token,
        },
      });
      if (response.status === 200) {
        const responseData = await response.json();
        dispatch({
          type: "UPDATE_USER",
          payload: {
            follower: responseData.user,
            following: responseData.followUser,
          },
        });
        updateUserHandler(responseData.user);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const unFollowUserHandler = async (userId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`/api/users/unfollow/${userId}`, {
        method: "POST",
        headers: {
          authorization: token,
        },
      });
      if (response.status) {
        const responseData = await response.json();
        dispatch({
          type: "UPDATE_USER",
          payload: {
            follower: responseData.user,
            following: responseData.followUser,
          },
        });
        updateUserHandler(responseData.user);
      }
    } catch (e) {
      console.error(e);
    }
  };
  const toggleFollow = (userId) => {
    return usersData.users
      .find(({ _id }) => _id === userId)
      .followers.find(({ username }) => username === loggedUsername)
      ? unFollowUserHandler(userId)
      : followUserHandler(userId);
  };

  const getPotentialFollowUser = () => {
    return usersData.users.filter(
      ({ username, followers }) =>
        !followers.find(({ username }) => username === loggedUsername) &&
        username !== loggedUsername
    );
  }
    const shouldFollowEnable = (username) => {
      return username !== loggedUsername;
    };
  
    const isFollowing = (checking) => {
      const user = usersData.users.find(({ username }) => username === checking);
      return user.followers.find(({ username }) => username === loggedUsername);
  };

  useEffect(() => {
    getUsersData();
  }, []);
  return (
    <UserContext.Provider
      value={{
        users: usersData.users,
        searchUserDetail,
        toggleFollow,
        shouldFollowEnable,
        unFollowUserHandler,
        getPotentialFollowUser,
        isFollowing,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};