import { Outlet } from "react-router";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { SuggestionBar } from "./SuggestionBar";
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