import React, { useEffect, useState } from "react";
import {
  Plus,
  BadgeCheck,
  IndianRupee,
  Calendar,
  Pencil,
  Trash2,
} from "lucide-react";
import PlanModal from "../components/PlanModal";
import DeletePlanModal from "../components/DeletePlanModal";
import useAxios from "../hooks/useAxios";

export default function Plans() {
  const api = useAxios();
  const [openPlanModal, setOpenPlanModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [stats, setStats] = useState({});
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState();

  const closeModal = () => {
    setOpenPlanModal(false);
  };
  const closeDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const getStats = async () => {
    try {
      const response = await api.get("/api/plans/statsCount");
      setStats(response.data.stats);
    } catch (error) {
      console.log(error);
    }
  };
  const getPlans = async () => {
    try {
      const response = await api.get("/api/plans");
      setPlans(response.data.plans);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStats();
    getPlans();
  }, []);

  const updateIsActiveToggle = async (planId, isActive) => {
    try {
      const response = await api.patch(
        `/api/plans/${planId}/updateActiveStatus`,
        {
          isActive: !isActive,
        },
      );
      if (response.status === 200) {
        setPlans((prev) =>
          prev.map((plan) =>
            plan.id === planId
              ? {
                  ...plan,
                  is_active: response.data.updateStatus.is_active,
                }
              : plan,
          ),
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Membership Plans</h1>
          <p className="text-gray-500">Manage your gym membership plans.</p>
        </div>

        <button
          onClick={() => {
            setIsEdit(false);
            setOpenPlanModal(true);
          }}
          className="flex items-center gap-2 bg-black text-white px-5 py-3 rounded-lg hover:bg-gray-800"
        >
          <Plus size={18} />
          Add Plan
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        <div className="bg-white rounded-xl p-5 shadow">
          <BadgeCheck className="text-green-600 mb-3" size={28} />
          <h2 className="text-3xl font-bold">{plans.length}</h2>
          <p className="text-gray-500">Total Plans</p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow">
          <IndianRupee className="text-blue-600 mb-3" size={28} />
          <h2 className="text-3xl font-bold">₹{stats.lowest_price}</h2>
          <p className="text-gray-500">Lowest Plan</p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow">
          <Calendar className="text-orange-500 mb-3" size={28} />
          <h2 className="text-3xl font-bold">
            {stats.longest_duration} Months
          </h2>
          <p className="text-gray-500">Longest Duration</p>
        </div>
      </div>

      {/* Plans Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr className="text-left">
              <th className="p-4">Plan Name</th>
              <th className="p-4">Duration</th>
              <th className="p-4">Price</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {plans.map((plan) => {
              return (
                <tr key={plan.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium">{plan.plan_name}</td>
                  <td className="p-4">{plan.duration} Months</td>
                  <td className="p-4">₹{plan.price}</td>
                  <td className="p-4">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={plan.is_active}
                        className="sr-only peer"
                        onChange={() =>
                          updateIsActiveToggle(plan.id, plan.is_active)
                        }
                      />

                      <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-green-500 transition-all"></div>

                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-5"></div>
                    </label>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => {
                          setIsEdit(true);
                          setSelectedPlan(plan.id);
                          setOpenPlanModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => {
                          setOpenDeleteModal(true);
                        }}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <PlanModal
        openPlanModal={openPlanModal}
        closeModal={closeModal}
        isEdit={isEdit}
        selectedPlan={selectedPlan}
        getPlans={getPlans}
      />
      <DeletePlanModal
        openDeleteModal={openDeleteModal}
        closeModal={closeDeleteModal}
        // onDelete={}
        // planName={}
      />
    </div>
  );
}
