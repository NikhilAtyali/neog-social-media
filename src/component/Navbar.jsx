import { useContext } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AuthContext } from "../context/AuthContext";
export const Navbar = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      <nav className="nav-container">
        <img
          className="nav-brand-logo"
          src={require("../images/logo.png")}
          alt="hangout logo"
        />

        <input className="search-input" placeholder="Search User" />
        <Link>
        <img />
        </Link>
      </nav>
    </>
  );
};