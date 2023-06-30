import { Outlet } from "react-router";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { SuggestionBar } from "./SuggestionBar";
export const Layout = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <SuggestionBar />
      {/* <Outlet /> */}
    </>
  );
};