import { useState} from "react";
import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./Sidebar.css";
import { Modal } from "../modal/Modal";
import { CreatePost } from "../create-post/CreatePost";
export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
    <Modal open={isOpen} close={() => setIsOpen(false)}>
        <CreatePost close={() => setIsOpen(false)} />
      </Modal>
      <aside className="sidebar-container">
      <NavLink to="/home">
          <HomeIcon />
        </NavLink>
        <NavLink to="/explore">
          <ExploreIcon />
        </NavLink>
        <button onClick={() => setIsOpen(true)}>
          <AddCircleOutlineIcon />
        </button>
        <NavLink to="/bookmark">
          <BookmarkIcon />
        </NavLink>
        <NavLink to="/liked">
          <FavoriteIcon />
        </NavLink>
      </aside>
    </>
  );
};
