import React from "react";
import { TriangleAlert, X } from "lucide-react";
import { toast } from "react-toastify";
import useAxios from "../hooks/useAxios";
import { useState } from "react";

export default function CancelMembershipModal({
  openCancelModal,
  closeCancelModal,
  getMemberships,
  selectedMembership,
}) {
  const api = useAxios();
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    try {
      setLoading(true);
      const response = await api.patch(
        `/api/memberships/cancel/${selectedMembership}`,
      );
      if (response.status === 200) {
        getMemberships();
        closeCancelModal();
        toast.success(
          response?.data?.message || "Membership cancelled Successfully!",
        );
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  if (!openCancelModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-5">
          <h2 className="text-xl font-bold">Cancel Membership</h2>

          <button
            onClick={closeCancelModal}
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

          <h3 className="text-lg font-semibold">Cancel this membership?</h3>

          <p className="mt-2 text-sm text-gray-500">
            This action cannot be undone. The selected membership will be
            permanently cancelled.
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t px-6 py-5">
          <button
            onClick={closeCancelModal}
            className="rounded-lg border border-gray-300 px-5 py-2.5 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleCancel}
            disabled={loading}
            className="rounded-lg bg-red-600 px-5 py-2.5 text-white hover:bg-red-700 transition"
          >
            {loading ? "Cancelling..." : "Cancel the membership"}
          </button>
        </div>
      </div>
    </div>
  );
}
