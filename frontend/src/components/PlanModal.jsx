import React from "react";
import { X } from "lucide-react";

export default function PlanModal({ openPlanModal, closeModal, isEdit }) {
  if (!openPlanModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <h2 className="text-2xl font-bold">
            {isEdit ? "Edit Plan" : "Add New Plan"}
          </h2>

          <button
            onClick={closeModal}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <form className="p-6 space-y-5">
          {/* Plan Name */}
          <div>
            <label className="block text-sm font-medium mb-2">Plan Name</label>

            <input
              type="text"
              placeholder="Monthly Plan"
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-black outline-none"
            />
          </div>

          {/* Duration & Price */}
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-2">Duration</label>

              <select className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-black outline-none">
                <option>1 Month</option>
                <option>3 Months</option>
                <option>6 Months</option>
                <option>12 Months</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Price (₹)
              </label>

              <input
                type="number"
                placeholder="999"
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-black outline-none"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Description
            </label>

            <textarea
              rows={4}
              placeholder="Enter plan description..."
              className="w-full border rounded-lg px-4 py-3 resize-none focus:ring-2 focus:ring-black outline-none"
            />
          </div>

          {/* Status */}
          <div className="flex items-center justify-between border rounded-lg px-4 py-3">
            <div>
              <p className="font-medium">Status</p>
              <p className="text-sm text-gray-500">
                Enable or disable this membership plan.
              </p>
            </div>

            <label className="relative inline-flex cursor-pointer items-center">
              <input type="checkbox" className="sr-only peer" defaultChecked />

              <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-green-500 transition"></div>

              <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-5"></div>
            </label>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={closeModal}
              className="border px-5 py-2.5 rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-black text-white px-6 py-2.5 rounded-lg hover:bg-gray-800"
            >
              {isEdit ? "Update Plan" : "Create Plan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
