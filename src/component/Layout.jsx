import { Outlet } from "react-router";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
export const Layout = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Outlet />
    </>
  );
};