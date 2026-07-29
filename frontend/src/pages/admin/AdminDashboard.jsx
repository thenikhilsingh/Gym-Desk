import React from "react";
import {
  Users,
  UserCheck,
  UserX,
  IndianRupee,
  TrendingUp,
  CalendarCheck2,
} from "lucide-react";

const cards = [
  {
    title: "Total Members",
    value: "256",
    subtitle: "+12 this month",
    icon: Users,
    bg: "bg-violet-100",
    iconColor: "text-violet-600",
  },
  {
    title: "Active Members",
    value: "210",
    subtitle: "+8 this month",
    icon: UserCheck,
    bg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    title: "Expired Members",
    value: "46",
    subtitle: "-4 this month",
    icon: UserX,
    bg: "bg-orange-100",
    iconColor: "text-orange-600",
  },
  {
    title: "Today's Attendance",
    value: "128",
    subtitle: "72% of members",
    icon: CalendarCheck2,
    bg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Monthly Revenue",
    value: "₹1,28,450",
    subtitle: "+18% this month",
    icon: IndianRupee,
    bg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
];

export default function AdminDashboard() {
  return (
    <div className="bg-[#F6F8FC] p-6 lg:p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-500 mt-1">
            Welcome back! Here's what's happening today.
          </p>
        </div>

        <button className="px-5 py-3 rounded-xl bg-white shadow">
          20 July 2026
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="bg-white rounded-2xl shadow-sm p-6"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500">{card.title}</p>

                  <h2 className="text-4xl font-bold mt-3">{card.value}</h2>

                  <p className="text-green-600 text-sm mt-2">{card.subtitle}</p>
                </div>

                <div className={`${card.bg} p-4 rounded-full`}>
                  <Icon className={card.iconColor} size={28} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Middle Section */}
      <div className="grid xl:grid-cols-3 gap-6 mt-8">
        {/* Revenue */}
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm p-6">
          <div className="flex justify-between mb-8">
            <h2 className="text-xl font-semibold">Revenue Overview</h2>

            <button className="border rounded-lg px-4 py-2">This Month</button>
          </div>

          <div className="h-80 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <TrendingUp size={60} className="mx-auto mb-4" />
              Revenue Chart Here
            </div>
          </div>
        </div>

        {/* Membership Status */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-8">Membership Status</h2>

          <div className="flex flex-col gap-5">
            <div className="flex justify-between">
              <span>🟢 Active</span>
              <span>210</span>
            </div>

            <div className="flex justify-between">
              <span>🟠 Expiring</span>
              <span>32</span>
            </div>

            <div className="flex justify-between">
              <span>🔴 Expired</span>
              <span>14</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="grid xl:grid-cols-3 gap-6 mt-8">
        {/* Recent Payments */}
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">Recent Payments</h2>

          <table className="w-full">
            <thead className="text-gray-500">
              <tr>
                <th className="text-left py-3">Member</th>
                <th className="text-left">Amount</th>
                <th className="text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {["Rahul", "Priya", "Amit", "Neha"].map((name) => (
                <tr key={name} className="border-t">
                  <td className="py-4">{name}</td>

                  <td>₹3000</td>

                  <td>
                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                      Paid
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pending */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">Pending Payments</h2>

          <div className="space-y-5">
            {["Sandeep", "Rohit", "Karan"].map((member) => (
              <div key={member} className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{member}</h3>

                  <p className="text-gray-500 text-sm">Gold Plan</p>
                </div>

                <p className="font-semibold">₹3000</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
