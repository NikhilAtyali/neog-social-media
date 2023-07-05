import { useContext } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AuthContext } from "../context/AuthContext";
export const Navbar = () => {
  const { user } = useContext(AuthContext);
  const { username, profileImg } = user;
  return (
    <>
      <nav className="nav-container">
        <img
          className="nav-brand-logo"
          src={require("../images/logo.png")}
          alt="hangout logo"
        />

        <input className="search-input" placeholder="Search User" />
        <Link to={`/profile/${username}`}>
          <img className="nav-user-image" src={profileImg} alt="user" />
        </Link>
      </nav>
    </>
  );
};