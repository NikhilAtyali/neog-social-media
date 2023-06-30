import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./Sidebar.css";

export const Sidebar = () => {
  return (
    <>
      <aside className="sidebar-container">
        <NavLink>
          <HomeIcon />
        </NavLink>
        <NavLink>
          <ExploreIcon />
        </NavLink>
        <button>
          <AddCircleOutlineIcon />
        </button>
        <NavLink>
          <BookmarkIcon />
        </NavLink>
        <NavLink>
          <FavoriteIcon />
        </NavLink>
      </aside>
    </>
  );
};
