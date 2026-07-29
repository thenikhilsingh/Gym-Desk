import React, { useState } from "react";
import { Bell, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { name: "Dashboard", link: "/app" },
  { name: "Payments", link: "/app/payments" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <header
      className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur border-b border-neutral-100"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&family=Inter:wght@400;500;600&display=swap');`}</style>

      <div className="w-full px-6 md:px-10 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-linear-to-br from-violet-600 via-fuchsia-500 to-pink-500" />
          <span
            className="text-sm font-semibold tracking-wide text-neutral-900"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            GYM DESK
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ name, link }) => {
            const active = pathname === link;
            return (
              <Link
                key={link}
                to={link}
                className={`text-sm font-medium transition-colors ${
                  active
                    ? "text-neutral-900"
                    : "text-neutral-500 hover:text-neutral-900"
                }`}
              >
                {name}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <button className="relative w-9 h-9 rounded-full bg-neutral-50 border border-neutral-200 flex items-center justify-center">
            <Bell size={16} className="text-neutral-500" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-fuchsia-500" />
          </button>
          <div className="hidden md:flex w-9 h-9 rounded-full bg-linear-to-br from-violet-500 to-pink-500 items-center justify-center text-white text-sm font-medium">
            AV
          </div>
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center text-neutral-700"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t border-neutral-100 px-4 py-3 flex flex-col gap-3">
          {NAV_LINKS.map(({ name, link }) => {
            const active = pathname === link;
            return (
              <Link
                key={link}
                to={link}
                onClick={() => setOpen(false)}
                className={`text-sm font-medium ${
                  active ? "text-neutral-900" : "text-neutral-500"
                }`}
              >
                {name}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
