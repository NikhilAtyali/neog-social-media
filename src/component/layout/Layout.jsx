import { Outlet } from "react-router";
import { Navbar } from "../navbar/Navbar"
import { Sidebar } from "../sidebar/Sidebar";
import { SuggestionBar } from "../suggestion-bar/SuggestionBar";
import "./Layout.css"
export const Layout = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <SuggestionBar />
      <div className="outlet-container">
        <Outlet />
      </div>
    </>
  );
};