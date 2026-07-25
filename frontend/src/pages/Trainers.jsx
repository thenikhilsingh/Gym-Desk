import React, { useState } from "react";
import { Plus, Users, BadgeCheck, UserX, Pencil, Trash2 } from "lucide-react";
import TrainerModal from "../components/TrainerModal";

export default function Trainers() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Trainers</h1>
          <p className="text-gray-500">Manage all gym trainers.</p>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="flex items-center gap-2 bg-black text-white px-5 py-3 rounded-lg hover:bg-gray-800"
        >
          <Plus size={18} />
          Add Trainer
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        <StatCard
          icon={<Users size={28} className="text-blue-600" />}
          value={0}
          title="Total Trainers"
        />

        <StatCard
          icon={<BadgeCheck size={28} className="text-green-600" />}
          value={0}
          title="Active Trainers"
        />

        <StatCard
          icon={<UserX size={28} className="text-red-600" />}
          value={0}
          title="Inactive Trainers"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr className="text-left">
                <th className="p-4">Photo</th>
                <th className="p-4">Name</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Email</th>
                <th className="p-4">Specialization</th>
                <th className="p-4">Salary</th>
                <th className="p-4">Joining Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td
                  colSpan={9}
                  className="text-center py-8 text-gray-500 font-medium"
                >
                  No trainers found
                </td>
              </tr>

              {/* <tr className="border-b hover:bg-gray-50">
                <td className="p-4">
                  <img
                    src={trainer.profile_image}
                    alt=""
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </td>

                <td className="p-4 font-medium">Rahul Sharma</td>

                <td className="p-4">9876543210</td>

                <td className="p-4">rahul@gmail.com</td>

                <td className="p-4">Strength Training</td>

                <td className="p-4 font-medium">₹35,000</td>

                <td className="p-4">20 Jul 2026</td>

                <td className="p-4">
                  <div className="flex justify-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={trainer.status === "Active"}
                        onChange={() => handleStatusToggle(trainer.id)}
                        className="sr-only peer"
                      />

                      <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-600 transition-colors"></div>

                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-5"></div>
                    </label>
                  </div>
                </td>

                <td className="p-4">
                  <div className="flex justify-center gap-3">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Pencil size={18} />
                    </button>

                    <button className="text-red-600 hover:text-red-800">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr> */}
            </tbody>
          </table>
        </div>
      </div>
      <TrainerModal openModal={openModal} setOpenModal={setOpenModal} />
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
