import React, { useEffect, useState } from "react";
import { TriangleAlert, X } from "lucide-react";
import { toast } from "react-toastify";
import useAxios from "../hooks/useAxios";

export default function DeleteMemberModal({
  openDeleteModal,
  closeModal,
  selectedMember,
  getMembers,
}) {
  const api = useAxios();
  const [memberName, setMemberName] = useState("");

  const getSelectedMemberDetails = async () => {
    try {
      const response = await api.get(`/api/members/${selectedMember}`);

      const member = response.data.member;

      setMemberName(`${member.first_name} ${member.last_name || ""}`.trim());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (openDeleteModal && selectedMember) {
      getSelectedMemberDetails();
    }
  }, [openDeleteModal, selectedMember]);

  const handleDelete = async () => {
    try {
      const response = await api.delete(
        `/api/members/delete/${selectedMember}`,
      );

      if (response.status === 200) {
        getMembers();
        closeModal();
        toast.success(
          response?.data?.message || "Member deleted successfully!",
        );
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  if (!openDeleteModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-5">
          <h2 className="text-xl font-bold text-red-600">Delete Member</h2>

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
            <TriangleAlert size={32} className="text-red-600" />
          </div>

          <h3 className="text-lg font-semibold">
            Are you sure you want to delete {memberName || "this member"}?
          </h3>

          <p className="mt-2 text-gray-500">
            This will permanently delete{" "}
            <span className="font-semibold text-black">
              {memberName || "this member"}
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
            onClick={handleDelete}
            className="rounded-lg bg-red-600 px-5 py-2.5 text-white hover:bg-red-700"
          >
            Delete Member
          </button>
        </div>
      </div>
    </div>
  );
}
