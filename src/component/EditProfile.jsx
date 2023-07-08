import { useRef } from "react";
import "./EditProfile.css";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
export const EditProfile = ({ userDetail }) => {
  const { _id, firstName, lastName, username, profileImg, bannerImg, quote } =
    userDetail;

  const profileImageRef = useRef(null);
  const handleProfileClick = () => {
    profileImageRef.current.click();
  };
  return (
    <>
      <form className="edit-profile-form">
        <label className="avatar-label">
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
        <label>
          Banner image:
          <input type="file" id="bannerImg" />
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
        <label>
          Bio:
          <input type="text" value={quote} />
        </label>

        <label>
          Website:
          <input
            type="url"
            placeholder="https://example.com"
            pattern="https://.*"
            size="30"
          />
        </label>
        <button type="submit">Update</button>
      </form>
    </>
  );
};