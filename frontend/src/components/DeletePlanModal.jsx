import React from "react";
import { TriangleAlert, X } from "lucide-react";

export default function DeletePlanModal({
  openDeleteModal,
  closeModal,
  onDelete,
  planName,
}) {
  if (!openDeleteModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-5">
          <h2 className="text-xl font-bold text-red-600">Delete Plan</h2>

          <button
            onClick={closeModal}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-8 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <TriangleAlert className="text-red-600" size={32} />
          </div>

          <h3 className="text-lg font-semibold">
            Are you sure you want to delete this plan?
          </h3>

          <p className="mt-2 text-gray-500">
            This will permanently delete{" "}
            <span className="font-semibold text-black">
              {planName || "this plan"}
            </span>
            . This action cannot be undone.
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t px-6 py-4">
          <button
            onClick={closeModal}
            className="rounded-lg border px-5 py-2.5 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={onDelete}
            className="rounded-lg bg-red-600 px-5 py-2.5 text-white hover:bg-red-700"
          >
            Delete Plan
          </button>
        </div>
      </div>
    </div>
  );
}
