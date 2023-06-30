import "./Navbar.css";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
export const Navbar = () => {
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
          <AccountCircleIcon />
        </Link>
      </nav>
    </>
  );
};