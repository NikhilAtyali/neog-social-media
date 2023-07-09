import { createContext, useContext, useEffect, useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { PostContext } from "./PostContext";

export const UserContext = createContext();
const usersReducer = (prevState, { type, payload }) => {
  switch (type) {
    case "SET_USERS":
      return { ...prevState, users: [...payload] };
    case "UPDATE_PROFILE":
      return {
        ...prevState,
        users: prevState.users.map((user) =>
          user._id === payload._id ? payload : user
        ),
      };
    case "UPDATE_FOLLOW":
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
  console.log(usersData);
  const { updateUserHandler, loggedUsername, toastHandler } = useContext(AuthContext);
  const { getMediaUploadLink } = useContext(PostContext);
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
          type: "UPDATE_FOLLOW",
          payload: {
            follower: responseData.user,
            following: responseData.followUser,
          },
        });
        toastHandler(`Followed ${responseData.followUser.username}`, "success");
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
          type: "UPDATE_FOLLOW",
          payload: {
            follower: responseData.user,
            following: responseData.followUser,
          },
        });
        toastHandler(
          `Unfollowed ${responseData.followUser.username}`,
          "success"
        );
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
  };

  const shouldFollowEnable = (username) => {
    return username !== loggedUsername;
  };

  const isFollowing = (checking) => {
    const user = usersData.users.find(({ username }) => username === checking);
    return user.followers.find(({ username }) => username === loggedUsername);
  };

  const getRequestBody = async (profileImg, bannerImg, bio, url) => {
    const profileImgUrl = await getMediaUploadLink(profileImg);
    const bannerImgUrl = await getMediaUploadLink(bannerImg);
    if (profileImgUrl !== "" && bannerImgUrl !== "") {
      return {
        userData: {
          quote: bio,
          portfolioURL: url,
          profileImg: profileImgUrl,
          bannerImg: bannerImgUrl,
        },
      };
    } else if (profileImgUrl !== "" && bannerImgUrl === "") {
      return {
        userData: {
          quote: bio,
          portfolioURL: url,
          profileImg: profileImgUrl,
        },
      };
    } else if (profileImgUrl === "" && bannerImgUrl !== "") {
      return {
        userData: {
          quote: bio,
          portfolioURL: url,
          bannerImg: bannerImgUrl,
        },
      };
    } else {
      return {
        userData: {
          quote: bio,
          portfolioURL: url,
        },
      };
    }
  };

  const editProfileHandler = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const profileImg = e.target.elements.profileImg.files[0];
    const bannerImg = e.target.elements.bannerImg.files[0];
    const url = e.target.elements.porfileUrl.value;
    const bio = e.target.elements.bio.value;
    const body = await getRequestBody(profileImg, bannerImg, bio, url);

    const requestBody = JSON.stringify(body);
    try {
      const response = await fetch("/api/users/edit", {
        method: "POST",
        headers: {
          authorization: token,
        },
        body: requestBody,
      });
      if (response.status === 201) {
        const responseData = await response.json();
        dispatch({ type: "UPDATE_PROFILE", payload: responseData.user });
        updateUserHandler(responseData.user);
        toastHandler(`Profile Updated`, "success");
        return true;
      }
      return false;
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getUsersData();
  }, [loggedUsername]);

  return (
    <UserContext.Provider
      value={{
        users: usersData.users,
        searchUserDetail,
        toggleFollow,
        getUsersData,
        shouldFollowEnable,
        unFollowUserHandler,
        isFollowing,
        editProfileHandler,
        getPotentialFollowUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};