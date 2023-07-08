import { useContext, useReducer, useRef } from "react";
import "./EditProfile.css";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { UserContext } from "../context/userContext";

const profileReducer = (prevState, { type, payload }) => {
  switch (type) {
    case "UPDATE_BIO":
      return { ...prevState, profileQuote: payload };
    case "UPDATE_URL":
      return { ...prevState, url: payload };
    default:
      return prevState;
  }
};

export const EditProfile = ({ userDetail, close }) => {
  const [profileData, dispatch] = useReducer(profileReducer, {
    profileQuote: userDetail?.quote,
    url: userDetail?.portfolioURL,
  });
  const { firstName, lastName, username, profileImg } = userDetail;
  const { editProfileHandler } = useContext(UserContext);

  const profileImageRef = useRef(null);

  const handleProfileClick = (e) => {
    if (e.target.id !== "profileImg") {
      return;
    }
    profileImageRef.current.click();
  };

  const handleSubmit = (e) => {
    const success = editProfileHandler(e);
    if (success) {
      close();
    }
  };

  return (
    <>
      <form className="edit-profile-form" onSubmit={(e) => handleSubmit(e)}>
        <label className="avatar-label" htmlFor="profileImg">
          Avatar
          <span>
            <img
              src={profileImg}
              alt={username}
              className="edit-profile-image"
            />
            <CameraAltIcon
              className="edit-profile-camera-icon"
              onClick={handleProfileClick}
            />
          </span>
          <input
            type="file"
            accept="image/*"
            id="profileImg"
            ref={profileImageRef}
            style={{ display: "none" }}
          />
        </label>
        <label htmlFor="bannerImg">
          Banner image:
          <input type="file" id="bannerImg" accept="image/*" />
        </label>
        <label>
          Name:{" "}
          <span className="edit-profile-username">
            {firstName + " " + lastName}
          </span>
        </label>
        <label>
          Username: <span>{username}</span>
        </label>
        <label htmlFor="profileUrl">
          Website:
          <input
            type="url"
            placeholder="https://example.com"
            pattern="https://.*"
            size="30"
            id="porfileUrl"
            value={profileData.url}
            onChange={(e) =>
              dispatch({ type: "UPDATE_URL", payload: e.target.value })
            }
          />
        </label>
        <label htmlFor="bio">
          Bio:
          <textarea
            className="edit-profile-bio"
            value={profileData.profileQuote}
            id="bio"
            onChange={(e) =>
              dispatch({ type: "UPDATE_BIO", payload: e.target.value })
            }
          ></textarea>
        </label>

        <button className="edit-user-btn" type="submit">
          Update profile
        </button>
      </form>
    </>
  );
};