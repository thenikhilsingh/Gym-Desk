import React from "react";
import { X } from "lucide-react";

export default function MembershipsModal({ openMembershipModal, closeModal }) {
  if (!openMembershipModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-5">
          <div>
            <h2 className="text-2xl font-bold">Add Membership</h2>
            <p className="text-sm text-gray-500 mt-1">
              Assign a membership plan to a member.
            </p>
          </div>

          <button
            onClick={closeModal}
            className="rounded-lg p-2 hover:bg-gray-100 transition"
          >
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Member */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Member <span className="text-red-500">*</span>
              </label>

              <select className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black">
                <option>Select Member</option>
                <option>Nikhil Singh</option>
                <option>Rahul Kumar</option>
                <option>Aman Verma</option>
              </select>
            </div>

            {/* Plan */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Plan <span className="text-red-500">*</span>
              </label>

              <select className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black">
                <option>Select Plan</option>
                <option>Silver Plan</option>
                <option>Gold Plan</option>
                <option>Platinum Plan</option>
              </select>
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Start Date <span className="text-red-500">*</span>
              </label>

              <input
                type="date"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
              />
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Amount Paid <span className="text-red-500">*</span>
              </label>

              <input
                type="number"
                placeholder="Enter amount"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
              />
            </div>

            {/* Payment Status */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Payment Status
              </label>

              <select className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black">
                <option>Paid</option>
                <option>Pending</option>
                <option>Partial</option>
              </select>
            </div>

            {/* Notes */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Notes</label>

              <textarea
                rows={4}
                placeholder="Enter notes..."
                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t px-6 py-5">
          <button
            onClick={closeModal}
            className="rounded-lg border border-gray-300 px-5 py-2.5 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button className="rounded-lg bg-black px-6 py-2.5 text-white hover:bg-gray-800 transition">
            Save Membership
          </button>
        </div>
      </div>
    </div>
  );
}
