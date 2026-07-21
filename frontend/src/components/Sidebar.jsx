import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import {
  Dumbbell,
  LayoutDashboard,
  Users,
  BadgeIndianRupee,
  CreditCard,
  CalendarCheck2,
  UserCog,
  BarChart3,
  Bell,
  Settings,
  LogOutIcon,
} from "lucide-react";
import { AuthContext } from "../context/AuthContext";

const menuItems = [
  {
    title: "Dashboard",
    icon: <LayoutDashboard size={20} />,
    path: "/admin",
  },
];

export default function Sidebar() {
  const { user } = useContext(AuthContext);
  return (
    <aside className="w-full h-screen bg-black text-white flex flex-col justify-between px-5 py-8">
      {/* Logo */}
      <div>
        <div className="flex items-center gap-3">
          <div className="bg-violet-600 p-2 rounded-xl">
            <Dumbbell size={26} />
          </div>

          <div>
            <h1 className="text-3xl font-bold">GYM DESK</h1>
            <p className="text-sm text-gray-300">Gym Management System</p>
          </div>
        </div>

        {/* Menu */}
        <div className="mt-12 flex flex-col gap-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.title}
              to={item.path}
              end
              className={({ isActive }) =>
                `flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-200
                ${
                  isActive
                    ? "bg-linear-to-r from-[#202020] to-[#525151] shadow-lg"
                    : "hover:bg-white/10"
                }`
              }
            >
              {item.icon}

              <span className="text-lg">{item.title}</span>
            </NavLink>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-5">
        {/* Logout */}
        <NavLink
          to="/logout"
          className={
            "flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-200 bg-red-500"
          }
        >
          <LogOutIcon />
          <span className="text-lg">Logout</span>
        </NavLink>
        {/* Admin */}
        <div className="border-t border-white/10 pt-5">
          <div className="flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/150?img=12"
              alt=""
              className="w-12 h-12 rounded-full"
            />
            <div>
              <div className="flex gap-2 items-center">
                <h3 className="font-semibold text-xl">{`${user?.first_name} ${user?.last_name}`}</h3>
                <p className="bg-purple-600 p-1 rounded-2xl text-sm">Admin</p>
              </div>
              <p className="text-sm text-gray-300">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
