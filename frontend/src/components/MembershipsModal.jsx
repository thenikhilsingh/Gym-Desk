import React from "react";
import { X } from "lucide-react";
import useAxios from "../hooks/useAxios";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function MembershipsModal({
  openMembershipModal,
  closeModal,
  isEdit,
  getMemberships,
}) {
  const api = useAxios();
  const [loading, setLoading] = useState();
  const [members, setMembers] = useState([]);
  const [plans, setPlans] = useState([]);
  const [payload, setPayload] = useState({
    memberId: "",
    planId: "",
    startDate: "",
    amountPaid: "",
    paymentStatus: "",
    notes: "",
  });

  const handleClose = () => {
    closeModal();
    setPayload({
      memberId: "",
      planId: "",
      startDate: "",
      amountPaid: "",
      paymentStatus: "",
      notes: "",
    });
  };

  const getMembersAndPlans = async () => {
    try {
      const response = await api.get("/api/members");
      setMembers(response.data.allMembers);
      const result = await api.get("/api/plans");
      setPlans(result.data.plans);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (openMembershipModal) {
      getMembersAndPlans();
    }
  }, [openMembershipModal]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setPayload({
      ...payload,
      [name]:
        type === "number" || name === "memberId" || name === "planId"
          ? Number(value)
          : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEdit) {
        console.log(payload);
      } else {
        const response = await api.post("/api/memberships/add", payload);
        if (response.status === 201) {
          getMemberships();
          handleClose();
          toast.success(
            response?.data?.message || "Membership added Successfully!",
          );
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  if (!openMembershipModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-5">
          <div>
            {isEdit ? "Update Membership" : "Add Membership"}
            <p className="text-sm text-gray-500 mt-1">
              Assign a membership plan to a member.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
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

              <select
                name="memberId"
                value={payload.memberId}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
              >
                <option value="">Select Member</option>
                {members.map((member) => {
                  return (
                    <option
                      key={member.id}
                      value={member.id}
                    >{`${member.first_name} ${member.last_name}`}</option>
                  );
                })}
              </select>
            </div>

            {/* Plan */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Plan <span className="text-red-500">*</span>
              </label>

              <select
                name="planId"
                value={payload.planId}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
              >
                <option>Select Plan</option>
                {plans.map((plan) => {
                  return (
                    <option key={plan.id} value={plan.id}>
                      {plan.plan_name}
                    </option>
                  );
                })}
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
                name="startDate"
                value={payload.startDate}
                onChange={handleChange}
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
                name="amountPaid"
                value={payload.amountPaid}
                onChange={handleChange}
              />
            </div>

            {/* Payment Status */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Payment Status
              </label>

              <select
                name="paymentStatus"
                value={payload.paymentStatus}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
              >
                <option value="">Select payment status</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Partial">Partial</option>
              </select>
            </div>

            {/* Notes */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Notes</label>

              <textarea
                rows={4}
                placeholder="Enter notes..."
                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                name="notes"
                value={payload.notes}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t px-6 py-5">
          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg border border-gray-300 px-5 py-2.5 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-black px-6 py-2.5 text-white hover:bg-gray-800 transition"
          >
            {loading
              ? isEdit
                ? "Updating..."
                : "Adding..."
              : isEdit
                ? "Update Membership"
                : "Add Membership"}
          </button>
        </div>
      </form>
    </div>
  );
}
