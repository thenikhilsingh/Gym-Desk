import React, { useState } from "react";
import {
  Plus,
  CreditCard,
  BadgeCheck,
  Clock3,
  IndianRupee,
  Pencil,
  Trash2,
} from "lucide-react";
import MembershipsModal from "../components/MembershipsModal";
import DeleteMembershipModal from "../components/DeleteMembershipModal";

export default function Memberships() {
  const [memberships, setMemberships] = useState([
    {
      id: 1,
      member: "Nikhil Singh",
      plan: "Gold Plan",
      start_date: "23 Jul 2026",
      end_date: "22 Aug 2026",
      amount_paid: 2500,
      payment_status: "Paid",
      status: "Active",
      notes: "Paid through UPI and received student discount.",
    },
    {
      id: 2,
      member: "Rahul Kumar",
      plan: "Silver Plan",
      start_date: "01 Jul 2026",
      end_date: "31 Jul 2026",
      amount_paid: 1500,
      payment_status: "Pending",
      status: "Cancelled",
      notes: "Membership cancelled due to relocation.",
    },
    {
      id: 3,
      member: "Aman Verma",
      plan: "Platinum Plan",
      start_date: "15 Jul 2026",
      end_date: "15 Oct 2026",
      amount_paid: 6000,
      payment_status: "Partial",
      status: "Active",
      notes: "Paid first installment. Remaining due next week.",
    },
  ]);

  const [openMembershipModal, setOpenMembershipModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const closeModal = () => {
    setOpenMembershipModal(false);
  };

  const closeDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Memberships</h1>
          <p className="text-gray-500">Manage all gym memberships.</p>
        </div>

        <button
          onClick={() => setOpenMembershipModal(true)}
          className="flex items-center gap-2 bg-black text-white px-5 py-3 rounded-lg hover:bg-gray-800"
        >
          <Plus size={18} />
          Add Membership
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">
        <StatCard
          icon={<CreditCard size={28} className="text-blue-600" />}
          value={0}
          title="Total Memberships"
        />

        <StatCard
          icon={<BadgeCheck size={28} className="text-green-600" />}
          value={0}
          title="Active"
        />

        <StatCard
          icon={<Clock3 size={28} className="text-red-600" />}
          value={0}
          title="Inactive"
        />

        <StatCard
          icon={<IndianRupee size={28} className="text-yellow-600" />}
          value={`₹0`}
          title="Revenue"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr className="text-left">
                <th className="p-4">Member</th>
                <th className="p-4">Plan</th>
                <th className="p-4">Start Date</th>
                <th className="p-4">End Date</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Status</th>
                <th className="p-4">Notes</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {!memberships.length ? (
                <tr>
                  <td
                    colSpan={9}
                    className="text-center py-8 text-gray-500 font-medium"
                  >
                    No memberships found
                  </td>
                </tr>
              ) : (
                memberships.map((membership) => (
                  <tr key={membership.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium">{membership.member}</td>
                    <td className="p-4">{membership.plan}</td>
                    <td className="p-4">{membership.start_date}</td>
                    <td className="p-4">{membership.end_date}</td>
                    <td className="p-4 font-medium">
                      ₹{membership.amount_paid}
                    </td>
                    <td className="p-4">
                      <PaymentBadge status={membership.payment_status} />
                    </td>
                    <td className="p-4">
                      <StatusBadge status={membership.status} />
                    </td>
                    <td className="p-4">
                      <span
                        title={membership.notes}
                        className="block max-w-45 truncate text-gray-600"
                      >
                        {membership.notes}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center gap-3">
                        <button className="text-blue-600 hover:text-blue-800 transition">
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() => setOpenDeleteModal(true)}
                          className="text-red-600 hover:text-red-800 transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <MembershipsModal
        openMembershipModal={openMembershipModal}
        closeModal={closeModal}
      />
      <DeleteMembershipModal
        openDeleteModal={openDeleteModal}
        closeDeleteModal={closeDeleteModal}
      />
    </div>
  );
}

function StatCard({ icon, value, title }) {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <div className="mb-3">{icon}</div>

      <h2 className="text-3xl font-bold">{value}</h2>

      <p className="text-gray-500">{title}</p>
    </div>
  );
}

function PaymentBadge({ status }) {
  let classes = "";

  switch (status) {
    case "Paid":
      classes = "bg-green-100 text-green-700";
      break;

    case "Pending":
      classes = "bg-red-100 text-red-700";
      break;

    case "Partial":
      classes = "bg-yellow-100 text-yellow-700";
      break;

    default:
      classes = "bg-gray-100 text-gray-700";
  }

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${classes}`}>
      {status}
    </span>
  );
}

function StatusBadge({ status }) {
  let classes = "";

  switch (status) {
    case "Active":
      classes = "bg-green-100 text-green-700";
      break;

    case "Expired":
      classes = "bg-red-100 text-red-700";
      break;

    case "Cancelled":
      classes = "bg-gray-200 text-gray-700";
      break;

    default:
      classes = "bg-gray-100 text-gray-700";
  }

  return (
    <span
      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${classes}`}
    >
      {status}
    </span>
  );
}
