import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Sidebar from "../components/Sidebar";

export default function Admin() {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#F6F8FC]">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-[18%]">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
          openSidebar ? "visible" : "invisible"
        }`}
      >
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity ${
            openSidebar ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpenSidebar(false)}
        />

        {/* Drawer */}
        <div
          className={`absolute left-0 top-0 h-full w-72 transform bg-black transition-transform duration-300 ${
            openSidebar ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar />

          <button
            onClick={() => setOpenSidebar(false)}
            className="absolute top-5 right-5 text-white"
          >
            <X />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto bg-[#F6F8FC]">
        {/* Mobile Navbar */}
        <div className="flex lg:hidden items-center justify-between bg-white shadow-sm px-5 py-4 fixed w-full">
          <button onClick={() => setOpenSidebar(true)}>
            <Menu size={28} />
          </button>

          <h1 className="text-xl font-bold">GYM DESK</h1>
        </div>

        <Outlet />
      </main>
    </div>
  );
}
