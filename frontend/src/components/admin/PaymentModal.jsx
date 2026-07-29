import React, { useState } from "react";
import { X } from "lucide-react";

export default function PaymentModal({ openModal, setOpenModal, isEdit }) {
  const members = [
    { id: 1, name: "Rahul Sharma" },
    { id: 2, name: "Amit Singh" },
  ];

  const memberships = [
    { id: 1, name: "Gold Plan", amount: 2500 },
    { id: 2, name: "Premium Plan", amount: 5000 },
  ];

  const [payload, setPayload] = useState({
    memberId: "",
    membershipId: "",
    amount: "",
    paymentType: "Manual",
    paymentMethod: "Cash",
    paymentStatus: "Paid",
    paymentDate: "",
    transactionId: "",
    remarks: "",
  });

  const handleClose = () => {
    setOpenModal(false);

    setPayload({
      memberId: "",
      membershipId: "",
      amount: "",
      paymentType: "Manual",
      paymentMethod: "Cash",
      paymentStatus: "Paid",
      paymentDate: "",
      transactionId: "",
      remarks: "",
    });
  };

  const paymentMethods =
    payload.paymentType === "Manual"
      ? ["Cash", "UPI", "Card", "Bank Transfer"]
      : ["Razorpay"];

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "paymentType") {
      setPayload((prev) => ({
        ...prev,
        paymentType: value,
        paymentMethod: value === "Manual" ? "Cash" : "Razorpay",
      }));
      return;
    }

    if (name === "membershipId") {
      const membership = memberships.find((m) => m.id === Number(value));

      setPayload((prev) => ({
        ...prev,
        membershipId: value,
        amount: membership ? membership.amount : "",
      }));

      return;
    }

    setPayload((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(payload);
  };

  if (!openModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl w-full max-w-3xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b p-6">
          <h2 className="text-2xl font-bold">
            {isEdit ? "Update Payment" : "Add Payment"}
          </h2>

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Member */}
            <div>
              <label className="block mb-2 font-medium">Member</label>

              <select
                name="memberId"
                value={payload.memberId}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3"
              >
                <option value="">Select Member</option>

                {members.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Membership */}
            <div>
              <label className="block mb-2 font-medium">Membership</label>

              <select
                name="membershipId"
                value={payload.membershipId}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3"
              >
                <option value="">Select Membership</option>

                {memberships.map((membership) => (
                  <option key={membership.id} value={membership.id}>
                    {membership.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Amount */}
            <div>
              <label className="block mb-2 font-medium">Amount</label>

              <input
                readOnly
                value={payload.amount}
                className="w-full border rounded-lg px-4 py-3 bg-gray-100"
              />
            </div>

            {/* Payment Date */}
            <div>
              <label className="block mb-2 font-medium">Payment Date</label>

              <input
                type="date"
                name="paymentDate"
                value={payload.paymentDate}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>
          </div>

          {/* Payment Type */}
          <div>
            <label className="block mb-3 font-medium">Payment Type</label>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() =>
                  setPayload((prev) => ({
                    ...prev,
                    paymentType: "Manual",
                    paymentMethod: "Cash",
                  }))
                }
                className={`px-6 py-2 rounded-lg border ${
                  payload.paymentType === "Manual" ? "bg-black text-white" : ""
                }`}
              >
                Manual
              </button>

              <button
                type="button"
                onClick={() =>
                  setPayload((prev) => ({
                    ...prev,
                    paymentType: "Online",
                    paymentMethod: "Razorpay",
                  }))
                }
                className={`px-6 py-2 rounded-lg border ${
                  payload.paymentType === "Online" ? "bg-black text-white" : ""
                }`}
              >
                Online
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Method */}
            <div>
              <label className="block mb-2 font-medium">Payment Method</label>

              <select
                name="paymentMethod"
                value={payload.paymentMethod}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3"
              >
                {paymentMethods.map((method) => (
                  <option key={method}>{method}</option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block mb-2 font-medium">Payment Status</label>

              <select
                name="paymentStatus"
                value={payload.paymentStatus}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3"
              >
                <option>Paid</option>
                <option>Pending</option>
                <option>Failed</option>
                <option>Refunded</option>
              </select>
            </div>

            {/* Transaction */}
            {payload.paymentMethod !== "Cash" && (
              <div>
                <label className="block mb-2 font-medium">Transaction ID</label>

                <input
                  name="transactionId"
                  value={payload.transactionId}
                  onChange={handleChange}
                  placeholder="Enter Transaction ID"
                  className="w-full border rounded-lg px-4 py-3"
                />
              </div>
            )}

            {/* Remarks */}
            <div className="md:col-span-2">
              <label className="block mb-2 font-medium">Remarks</label>

              <textarea
                rows={3}
                name="remarks"
                value={payload.remarks}
                onChange={handleChange}
                placeholder="Enter remarks..."
                className="w-full border rounded-lg px-4 py-3 resize-none"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-6 flex justify-end gap-3">
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
            {isEdit ? "Update Payment" : "Save Payment"}
          </button>
        </div>
      </form>
    </div>
  );
}
