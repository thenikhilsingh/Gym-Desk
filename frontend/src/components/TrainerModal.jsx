import React from "react";
import { X, Upload } from "lucide-react";

export default function TrainerModal({ openModal, setOpenModal }) {
  const handleClose = () => {
    setOpenModal(false);
  };

  if (!openModal) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <form className="bg-white rounded-2xl shadow-xl w-full max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold">Add Trainer</h2>

          <button
            type="button"
            onClick={handleClose}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Image Upload */}
          <div className="flex justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-28 h-28 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                <Upload className="text-gray-400" size={30} />
              </div>

              <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm font-medium">
                Choose Image
                <input type="file" className="hidden" />
              </label>
            </div>
          </div>

          {/* Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block mb-2 font-medium">First Name</label>
              <input
                type="text"
                placeholder="Enter first name"
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Last Name</label>
              <input
                type="text"
                placeholder="Enter last name"
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Phone</label>
              <input
                type="text"
                placeholder="Enter phone"
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Email</label>
              <input
                type="email"
                placeholder="Enter email"
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Specialization</label>
              <input
                type="text"
                placeholder="Strength Training"
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Salary</label>
              <input
                type="number"
                placeholder="Enter salary"
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Joining Date</label>
              <input
                type="date"
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Status</label>

              <select className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black">
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t p-6">
          <button
            type="button"
            onClick={handleClose}
            className="px-5 py-2 rounded-lg border hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-black text-white hover:bg-gray-800"
          >
            Save Trainer
          </button>
        </div>
      </form>
    </div>
  );
}
