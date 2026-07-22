import React from "react";
import { X } from "lucide-react";

export default function MemberModal({ openMemberModal, closeModal, isEdit }) {
  if (!openMemberModal) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-2xl font-bold">
            {isEdit ? "Edit Member" : "Add Member"}
          </h2>

          <button
            onClick={closeModal}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* First Name */}
          <div>
            <label className="block mb-2 font-medium">First Name</label>

            <input
              type="text"
              className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter first name"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block mb-2 font-medium">Last Name</label>

            <input
              type="text"
              className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter last name"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-2 font-medium">Phone</label>

            <input
              type="text"
              className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black"
              placeholder="9876543210"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block mb-2 font-medium">Gender</label>

            <select className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black">
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          {/* DOB */}
          <div>
            <label className="block mb-2 font-medium">Date of Birth</label>

            <input
              type="date"
              className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Join Date */}
          <div>
            <label className="block mb-2 font-medium">Join Date</label>

            <input
              type="date"
              className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Height */}
          <div>
            <label className="block mb-2 font-medium">Height (cm)</label>

            <input
              type="number"
              className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Weight */}
          <div>
            <label className="block mb-2 font-medium">Weight (kg)</label>

            <input
              type="number"
              className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Emergency Contact Name */}
          <div>
            <label className="block mb-2 font-medium">
              Emergency Contact Name
            </label>

            <input
              type="text"
              className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Emergency Contact Phone */}
          <div>
            <label className="block mb-2 font-medium">
              Emergency Contact Phone
            </label>

            <input
              type="text"
              className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block mb-2 font-medium">Address</label>

            <textarea
              rows={3}
              className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black resize-none"
              placeholder="Enter address"
            />
          </div>

          {/* Profile Image */}
          <div className="md:col-span-2">
            <label className="block mb-2 font-medium">Profile Image</label>

            <input type="file" className="w-full border rounded-lg px-4 py-2" />
          </div>
        </div>

        {/* Footer */}
        <div className="border-t px-6 py-4 flex justify-end gap-3">
          <button
            onClick={closeModal}
            className="px-5 py-2 rounded-lg border hover:bg-gray-100"
          >
            Cancel
          </button>

          <button className="px-5 py-2 rounded-lg bg-black text-white hover:bg-gray-800">
            {isEdit ? "Update Member" : "Add Member"}
          </button>
        </div>
      </div>
    </div>
  );
}
