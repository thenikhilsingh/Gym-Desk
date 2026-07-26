import React, { useEffect, useState } from "react";
import { X, Phone, Mail, Calendar, IndianRupee, Dumbbell } from "lucide-react";
import useAxios from "../hooks/useAxios";
import useFormatDate from "../hooks/useFormatDate";

export default function TrainerViewModal({
  openModal,
  setOpenModal,
  selectedTrainer,
}) {
  const api = useAxios();
  const { formatDate } = useFormatDate();

  const [trainer, setTrainer] = useState(null);

  const getTrainerDetails = async () => {
    try {
      const response = await api.get(`/api/trainers/${selectedTrainer}`);

      if (response.status === 200) {
        setTrainer(response.data.trainer);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (openModal && selectedTrainer) {
      getTrainerDetails();
    }
  }, [openModal, selectedTrainer]);

  const handleClose = () => {
    setOpenModal(false);
    setTrainer(null);
  };

  if (!openModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl">
        {/* Header */}
        <div className="flex justify-between items-center border-b p-5">
          <h2 className="text-2xl font-bold">Trainer Details</h2>

          <button
            onClick={handleClose}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <X size={22} />
          </button>
        </div>

        {trainer && (
          <>
            {/* Profile */}
            <div className="flex flex-col items-center py-6">
              <img
                src={trainer.profile_image_url}
                alt=""
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
              />

              <h2 className="text-2xl font-bold mt-4">
                {trainer.first_name} {trainer.last_name}
              </h2>

              <p className="text-gray-500">{trainer.specialization}</p>

              <span
                className={`mt-3 px-4 py-1 rounded-full text-sm font-semibold ${
                  trainer.status
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {trainer.status ? "Active" : "Inactive"}
              </span>
            </div>

            {/* Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 px-8 pb-8">
              <InfoCard
                icon={<Phone size={18} />}
                title="Phone"
                value={trainer.phone}
              />

              <InfoCard
                icon={<Mail size={18} />}
                title="Email"
                value={trainer.email}
              />

              <InfoCard
                icon={<Dumbbell size={18} />}
                title="Specialization"
                value={trainer.specialization}
              />

              <InfoCard
                icon={<IndianRupee size={18} />}
                title="Salary"
                value={`₹${trainer.salary}`}
              />

              <InfoCard
                icon={<Calendar size={18} />}
                title="Joining Date"
                value={formatDate(trainer.joining_date)}
              />
            </div>

            {/* Footer */}
            <div className="border-t p-5 flex justify-end">
              <button
                onClick={handleClose}
                className="px-5 py-2 rounded-lg bg-black text-white hover:bg-gray-800"
              >
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function InfoCard({ icon, title, value }) {
  return (
    <div className="border rounded-xl p-4">
      <div className="flex items-center gap-2 text-gray-500 mb-2">
        {icon}
        <span className="font-medium">{title}</span>
      </div>

      <p className="font-semibold text-lg wrap-break-word">{value}</p>
    </div>
  );
}
