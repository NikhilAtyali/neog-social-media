import { useContext, useReducer, useRef, useState } from "react";
import "./EditProfile.css";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { UserContext } from "../../context/userContext"

const profileReducer = (prevState, { type, payload }) => {
  switch (type) {
    case "UPDATE_BIO":
      return { ...prevState, profileQuote: payload };
    case "UPDATE_URL":
      return { ...prevState, url: payload };
      case "UPDATE_PROFILE_IMG":
      return { ...prevState, img: payload };
    default:
      return prevState;
  }
};

export const EditProfile = ({ userDetail, close }) => {
  const [profileData, dispatch] = useReducer(profileReducer, {
    profileQuote: userDetail?.quote,
    url: userDetail?.portfolioURL,
    img: "",
  });
  const avatar = [
    "https://img.freepik.com/free-photo/3d-rendering-zoom-call-avatar_23-2149556785.jpg?size=626&ext=jpg&ga=GA1.1.1937692710.1688065671&semt=ais",
    "https://img.freepik.com/free-photo/3d-rendering-zoom-call-avatar_23-2149556777.jpg?size=626&ext=jpg&ga=GA1.1.1937692710.1688065671&semt=ais",
    "https://img.freepik.com/free-photo/fun-3d-cartoon-casual-character-woman_183364-80070.jpg?size=626&ext=jpg&ga=GA1.1.1937692710.1688065671&semt=ais",
    "https://img.freepik.com/free-photo/3d-rendering-zoom-call-avatar_23-2149556784.jpg?size=626&ext=jpg&ga=GA1.1.1937692710.1688065671&semt=ais",
    "https://img.freepik.com/free-photo/fun-3d-cartoon-teenage-boy_183364-81184.jpg?size=626&ext=jpg&ga=GA1.1.1937692710.1688065671&semt=ais",
    "https://img.freepik.com/free-photo/fun-3d-cartoon-illustration-indian-businessman_183364-114440.jpg?size=626&ext=jpg&ga=GA1.1.1937692710.1688065671&semt=ais",
  ];
  const { firstName, lastName, username, profileImg } = userDetail;
  const { editProfileHandler } = useContext(UserContext);

  const profileImageRef = useRef(null);

  const handleProfileClick = (e) => {
    if (e.target.id !== "profileImg") {
      return;
    }
    profileImageRef.current.click();
  };
  const [profileAvatar, setProfileAvatar] = useState(profileImg);
  const handleSubmit = (e) => {
    const success = editProfileHandler(e);
    if (success) {
      close();
    }
  };

  return (
    <>
      <form
        className="edit-profile-form"
        onSubmit={(e) => handleSubmit(e, profileAvatar)}
      >
        <label className="avatar-label" htmlFor="profileImg">
          Avatar
          <span>
            <img
              src={profileAvatar}
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
        <div className="avatar-listing-container">
          <p>Avatar options:</p>
          <ul className="avatar-listing">
            {avatar.map((link, i) => (
              <img
                src={link}
                alt={`avatar${i}`}
                onClick={() => setProfileAvatar(link)}
              />
            ))}
          </ul>
        </div>
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