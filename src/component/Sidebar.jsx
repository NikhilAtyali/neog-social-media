import { useState,useEffect } from "react";
import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./Sidebar.css";
import { Modal } from "./Modal";
import { CreatePost } from "./CreatePost";
export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    isOpen && (document.body.style.overflow = "hidden");
    !isOpen && (document.body.style.overflow = "unset");
  }, [isOpen]);
  return (
    <>
    <Modal open={isOpen} close={() => setIsOpen(false)}>
        <CreatePost />
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
