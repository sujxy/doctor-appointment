import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="w-screen ">
      <div className="sticky top-0 flex items-center justify-between px-8 py-3 shadow-md bg-white">
        <Link
          to="/"
          className="font-pacifico text-3xl text-primary hover:scale-105 transition-all"
        >
          DocPlus
        </Link>
        <Link to="/" className="outline-btn ">
          Login
        </Link>
      </div>
      <Outlet />
    </div>
  );
}
