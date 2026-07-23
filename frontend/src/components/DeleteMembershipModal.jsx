import React from "react";
import { TriangleAlert, X } from "lucide-react";

export default function DeleteMembershipModal({
  openDeleteModal,
  closeDeleteModal,
}) {
  if (!openDeleteModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-5">
          <h2 className="text-xl font-bold">Delete Membership</h2>

          <button
            onClick={closeDeleteModal}
            className="rounded-lg p-2 hover:bg-gray-100 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-8 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <TriangleAlert size={34} className="text-red-600" />
          </div>

          <h3 className="text-lg font-semibold">Delete this membership?</h3>

          <p className="mt-2 text-sm text-gray-500">
            This action cannot be undone. The selected membership will be
            permanently removed.
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t px-6 py-5">
          <button
            onClick={closeDeleteModal}
            className="rounded-lg border border-gray-300 px-5 py-2.5 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button className="rounded-lg bg-red-600 px-5 py-2.5 text-white hover:bg-red-700 transition">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
