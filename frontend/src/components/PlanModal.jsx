import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import useAxios from "../hooks/useAxios";
import { toast } from "react-toastify";

export default function PlanModal({
  openPlanModal,
  closeModal,
  isEdit,
  selectedPlan,
  getPlans,
}) {
  const api = useAxios();
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState({
    planName: "",
    duration: "",
    price: "",
    description: "",
    isActive: true,
  });

  const handleChange = (e) => {
    setPayload({
      ...payload,
      [e.target.name]:
        e.target.type === "checkbox"
          ? e.target.checked
          : e.target.type === "number" || e.target.name === "duration"
            ? Number(e.target.value)
            : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEdit) {
        const response = await api.patch(
          `/api/plans/edit/${selectedPlan}`,
          payload,
        );
        if (response.status === 200) {
          getPlans();
          closeModal();
          toast.success(
            response?.data?.message || "Plan updated Successfully!",
          );
        }
      } else {
        const response = await api.post("/api/plans/create", payload);
        if (response.status === 201) {
          getPlans();
          closeModal();
          toast.success(
            response?.data?.message || "Plan created Successfully!",
          );
          setPayload({
            planName: "",
            duration: "",
            price: "",
            description: "",
            isActive: true,
          });
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setPayload({
      planName: "",
      duration: "",
      price: "",
      description: "",
      isActive: true,
    });
    closeModal();
  };

  const getSelectPlanDetails = async () => {
    try {
      const response = await api.get(`/api/plans/${selectedPlan}`);
      const plan = response.data.plan;

      setPayload({
        planName: plan.plan_name,
        duration: plan.duration,
        price: plan.price,
        description: plan.description,
        isActive: plan.is_active,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (openPlanModal && isEdit && selectedPlan) {
      getSelectPlanDetails();
    }
  }, [openPlanModal, isEdit, selectedPlan]);

  if (!openPlanModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <h2 className="text-2xl font-bold">
            {isEdit ? "Edit Plan" : "Add New Plan"}
          </h2>

          <button
            onClick={handleClose}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Plan Name */}
          <div>
            <label className="block text-sm font-medium mb-2">Plan Name</label>

            <input
              type="text"
              placeholder="Monthly Plan"
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-black outline-none"
              name="planName"
              value={payload.planName}
              onChange={handleChange}
            />
          </div>

          {/* Duration & Price */}
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-2">Duration</label>

              <select
                name="duration"
                value={payload.duration}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-black outline-none"
              >
                <option value="">--SELECT DURATION--</option>
                <option value={1}>1 Month</option>
                <option value={3}>3 Months</option>
                <option value={6}>6 Months</option>
                <option value={12}>12 Months</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Price (₹)
              </label>

              <input
                type="number"
                placeholder="999"
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-black outline-none"
                name="price"
                value={payload.price}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Description
            </label>

            <textarea
              rows={4}
              placeholder="Enter plan description..."
              className="w-full border rounded-lg px-4 py-3 resize-none focus:ring-2 focus:ring-black outline-none"
              name="description"
              value={payload.description}
              onChange={handleChange}
            />
          </div>

          {/* Status */}
          <div className="flex items-center justify-between border rounded-lg px-4 py-3">
            <div>
              <p className="font-medium">Status</p>
              <p className="text-sm text-gray-500">
                Enable or disable this membership plan.
              </p>
            </div>

            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                name="isActive"
                checked={payload.isActive}
                onChange={handleChange}
                className="sr-only peer"
              />

              <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-green-500 transition"></div>

              <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-5"></div>
            </label>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={handleClose}
              className="border px-5 py-2.5 rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white px-6 py-2.5 rounded-lg hover:bg-gray-800"
            >
              {loading
                ? isEdit
                  ? "Updating..."
                  : "Creating..."
                : isEdit
                  ? "Update Plan"
                  : "Create Plan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
