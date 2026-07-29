import React from "react";
import {
  // Instagram,
  // Facebook,
  // Twitter,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="w-full bg-neutral-950 text-neutral-400"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-7 h-7 rounded-lg bg-linear-to-br from-violet-600 via-fuchsia-500 to-pink-500" />
            <span
              className="text-white text-sm font-semibold tracking-wide"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              GYM DESK
            </span>
          </div>
          <p className="text-sm text-neutral-500 leading-relaxed">
            Your membership, your progress, your plan — all in one place.
          </p>
          <div className="flex items-center gap-3 mt-4">
            <a
              href="#"
              className="w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center hover:bg-neutral-800 transition-colors"
            >
              {/* <Instagram size={14} /> */}
            </a>
            <a
              href="#"
              className="w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center hover:bg-neutral-800 transition-colors"
            >
              {/* <Facebook size={14} /> */}
            </a>
            <a
              href="#"
              className="w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center hover:bg-neutral-800 transition-colors"
            >
              {/* <Twitter size={14} /> */}
            </a>
          </div>
        </div>

        <div>
          <p className="text-white text-sm font-medium mb-3">Quick Links</p>
          <ul className="flex flex-col gap-2 text-sm">
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                My Membership
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Workout Plan
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Payments
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-white text-sm font-medium mb-3">Support</p>
          <ul className="flex flex-col gap-2 text-sm">
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Membership Rules
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Cancel / Freeze Plan
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Contact Trainer
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-white text-sm font-medium mb-3">Visit Us</p>
          <ul className="flex flex-col gap-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin size={15} className="mt-0.5 shrink-0" />
              <span>Sector 62, Noida, Uttar Pradesh</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={15} className="shrink-0" />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={15} className="shrink-0" />
              <span>hello@gymdesk.app</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-neutral-900 py-5">
        <p className="text-center text-xs text-neutral-600">
          © 2026 Gym Desk. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
