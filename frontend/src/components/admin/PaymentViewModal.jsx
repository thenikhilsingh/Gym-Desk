import React from "react";
import {
  X,
  CreditCard,
  CalendarDays,
  User,
  Receipt,
  Wallet,
  BadgeIndianRupee,
} from "lucide-react";

export default function PaymentViewModal({
  openModal,
  setOpenModal,
  selectedPayment,
}) {
  if (!openModal) return null;

  // Dummy Data
  const payment = {
    id: 1025,
    member: "Rahul Sharma",
    membership: "Gold Plan",
    amount: 2500,
    paymentMethod: "Cash",
    paymentStatus: "Paid",
    paymentDate: "26 Jul 2026",
    transactionId: "-",
    remarks: "Paid at reception.",
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-5">
          <h2 className="text-2xl font-bold">Payment Details</h2>

          <button
            onClick={() => setOpenModal(false)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Summary Card */}
          <div className="bg-gradient-to-r from-black to-gray-800 rounded-2xl p-6 text-white mb-8">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                <BadgeIndianRupee size={32} />
              </div>

              <div>
                <p className="text-sm opacity-80">Payment Amount</p>

                <h1 className="text-4xl font-bold">₹{payment.amount}</h1>

                <p className="opacity-80">Payment #{payment.id}</p>
              </div>
            </div>
          </div>

          {/* Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InfoCard
              icon={<User size={18} />}
              title="Member"
              value={payment.member}
            />
            <InfoCard
              icon={<Receipt size={18} />}
              title="Membership"
              value={payment.membership}
            />
            <InfoCard
              icon={<Wallet size={18} />}
              title="Payment Method"
              value={payment.paymentMethod}
            />
            {/* Status */}
            <div className="border rounded-xl p-5">
              <p className="text-sm text-gray-500 mb-3">Payment Status</p>

              <span
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  payment.paymentStatus === "Paid"
                    ? "bg-green-100 text-green-700"
                    : payment.paymentStatus === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : payment.paymentStatus === "Failed"
                        ? "bg-red-100 text-red-700"
                        : "bg-blue-100 text-blue-700"
                }`}
              >
                {payment.paymentStatus}
              </span>
            </div>
            <InfoCard
              icon={<CalendarDays size={18} />}
              title="Payment Date"
              value={payment.paymentDate}
            />
            <InfoCard
              icon={<CreditCard size={18} />}
              title="Transaction ID"
              value={payment.transactionId}
            />{" "}
            {/* Remarks */}
            <div className="md:col-span-2 border rounded-xl p-5">
              <p className="text-sm text-gray-500 mb-2">Remarks</p>

              <p className="text-gray-800 leading-7">
                {payment.remarks || "-"}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t px-6 py-4 flex items-center justify-between">
          <button className="flex items-center gap-2 border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-100 transition">
            <Receipt size={18} />
            Download Receipt
          </button>

          <button
            onClick={() => setOpenModal(false)}
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon, title, value }) {
  return (
    <div className="border rounded-xl p-5">
      <div className="flex items-center gap-2 text-gray-500 mb-2">
        {icon}
        <span className="text-sm font-medium">{title}</span>
      </div>

      <p className="text-lg font-semibold wrap-break-word">{value || "-"}</p>
    </div>
  );
}
