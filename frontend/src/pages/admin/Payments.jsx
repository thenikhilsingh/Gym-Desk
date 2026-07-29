import React, { useState } from "react";
import {
  Plus,
  CreditCard,
  Wallet,
  Globe,
  IndianRupee,
  Eye,
  Search,
  Download,
} from "lucide-react";
import PaymentModal from "../../components/admin/PaymentModal";
import PaymentViewModal from "../../components/admin/PaymentViewModal";

export default function Payments() {
  const [payments] = useState([]);

  const [stats] = useState({
    total_payments: 0,
    manual_payments: 0,
    online_payments: 0,
    total_revenue: 0,
  });

  const [openModal, setOpenModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);

  const [selectedPayment, setSelectedPayment] = useState(null);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Payments</h1>
          <p className="text-gray-500">Record and manage gym payments.</p>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="flex items-center gap-2 bg-black text-white px-5 py-3 rounded-lg hover:bg-gray-800"
        >
          <Plus size={18} />
          Record Payment
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-6">
        <StatCard
          icon={<CreditCard size={28} className="text-blue-600" />}
          value={stats.total_payments}
          title="Total Payments"
        />

        <StatCard
          icon={<Wallet size={28} className="text-orange-600" />}
          value={stats.manual_payments}
          title="Manual Payments"
        />

        <StatCard
          icon={<Globe size={28} className="text-green-600" />}
          value={stats.online_payments}
          title="Online Payments"
        />

        <StatCard
          icon={<IndianRupee size={28} className="text-purple-600" />}
          value={`₹${stats.total_revenue}`}
          title="Revenue"
        />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow p-4 mb-5">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search member..."
              className="w-full border rounded-lg pl-10 pr-4 py-2"
            />
          </div>

          <select className="border rounded-lg px-4 py-2">
            <option>All Sources</option>
            <option>Manual</option>
            <option>Online</option>
          </select>

          <select className="border rounded-lg px-4 py-2">
            <option>All Status</option>
            <option>Paid</option>
            <option>Pending</option>
            <option>Failed</option>
            <option>Refunded</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr className="text-left">
                <th className="p-4">Member</th>
                <th className="p-4">Membership</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Method</th>
                <th className="p-4">Source</th>
                <th className="p-4">Status</th>
                <th className="p-4">Payment Date</th>
                <th className="p-4 text-center">Receipt</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {!payments.length ? (
                <tr>
                  <td colSpan={9} className="text-center py-10 text-gray-500">
                    No payments found
                  </td>
                </tr>
              ) : (
                payments.map((payment) => (
                  <tr key={payment.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">{payment.member_name}</td>

                    <td className="p-4">{payment.membership_name}</td>

                    <td className="p-4 font-semibold">₹{payment.amount}</td>

                    <td className="p-4">{payment.payment_method}</td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          payment.payment_source === "Manual"
                            ? "bg-gray-100 text-gray-700"
                            : "bg-purple-100 text-purple-700"
                        }`}
                      >
                        {payment.payment_source}
                      </span>
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          payment.payment_status === "Paid"
                            ? "bg-green-100 text-green-700"
                            : payment.payment_status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : payment.payment_status === "Failed"
                                ? "bg-red-100 text-red-700"
                                : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {payment.payment_status}
                      </span>
                    </td>

                    <td className="p-4">{payment.payment_date}</td>

                    <td className="text-center">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Download size={18} />
                      </button>
                    </td>

                    <td className="text-center">
                      <button
                        onClick={() => {
                          setSelectedPayment(payment.id);
                          setViewModal(true);
                        }}
                        className="text-green-600 hover:text-green-800"
                      >
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <PaymentModal openModal={openModal} setOpenModal={setOpenModal} />

      <PaymentViewModal
        openModal={viewModal}
        setOpenModal={setViewModal}
        selectedPayment={selectedPayment}
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
