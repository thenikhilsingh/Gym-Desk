import React, { useEffect, useState } from "react";
import { X, Upload } from "lucide-react";
import useAxios from "../hooks/useAxios";
import { toast } from "react-toastify";
import useFormatDate from "../hooks/useFormatDate";

export default function TrainerModal({
  openModal,
  setOpenModal,
  isEdit,
  getTrainers,
  selectedTrainer,
  getTrainerStats,
}) {
  const api = useAxios();
  const { formatDate } = useFormatDate();
  const [payload, setPayload] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    specialization: "",
    salary: "",
    joiningDate: "",
    photo: null,
  });
  const [loading, setLoading] = useState(false);
  const [selectedTrainerPhoto, setSelectedTrainerPhoto] = useState("");

  const handleClose = () => {
    setOpenModal(false);
    setPayload({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      specialization: "",
      salary: "",
      joiningDate: "",
      photo: null,
    });
  };

  const getTrainerDetails = async () => {
    try {
      const response = await api.get(`/api/trainers/${selectedTrainer}`);
      if (response.status === 200) {
        const TrainerDetails = response.data.trainer;
        setSelectedTrainerPhoto(TrainerDetails.profile_image_url);
        setPayload({
          firstName: TrainerDetails.first_name,
          lastName: TrainerDetails.last_name,
          phone: TrainerDetails.phone,
          email: TrainerDetails.email,
          specialization: TrainerDetails.specialization,
          salary: TrainerDetails.salary,
          joiningDate: formatDate(TrainerDetails.joining_date, "input"),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (openModal && selectedTrainer && isEdit) {
      getTrainerDetails();
    }
  }, [openModal, selectedTrainer, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setPayload({
      ...payload,
      [name]:
        type === "number"
          ? value === ""
            ? ""
            : Number(value)
          : type === "file"
            ? files[0]
            : value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("firstName", payload.firstName);
    formData.append("lastName", payload.lastName);
    formData.append("phone", payload.phone);
    formData.append("email", payload.email);
    formData.append("specialization", payload.specialization);
    formData.append("salary", payload.salary);
    formData.append("joiningDate", payload.joiningDate);
    if (payload.photo) {
      formData.append("photo", payload.photo);
    }
    try {
      if (isEdit) {
        const response = await api.patch(
          `/api/trainers/edit/${selectedTrainer}`,
          formData,
        );
        if (response.status === 200) {
          getTrainers();
          getTrainerStats();
          handleClose();
          toast.success(
            response?.data?.message || "trainer updated Successfully!",
          );
        }
      } else {
        const response = await api.post("/api/trainers/add", formData);
        if (response.status === 201) {
          getTrainers();
          getTrainerStats();
          handleClose();
          toast.success(
            response?.data?.message || "trainer added Successfully!",
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

  if (!openModal) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl w-full max-w-3xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold">Add Trainer</h2>

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
          {/* Image Upload */}
          <div className="flex justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-28 h-28 rounded-full border-2 border-dashed border-gray-300 overflow-hidden flex items-center justify-center">
                {payload.photo ? (
                  <img
                    src={URL.createObjectURL(payload.photo)}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : selectedTrainerPhoto ? (
                  <img
                    src={selectedTrainerPhoto}
                    alt="Trainer"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Upload className="text-gray-400" size={30} />
                )}
              </div>

              <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm font-medium">
                Choose Image
                <input
                  name="photo"
                  accept="image/*"
                  onChange={handleChange}
                  type="file"
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block mb-2 font-medium">First Name</label>
              <input
                type="text"
                placeholder="Enter first name"
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                name="firstName"
                value={payload.firstName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Last Name</label>
              <input
                type="text"
                placeholder="Enter last name"
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                name="lastName"
                value={payload.lastName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Phone</label>
              <input
                type="text"
                placeholder="Enter phone"
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                name="phone"
                value={payload.phone}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Email</label>
              <input
                type="email"
                placeholder="Enter email"
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                name="email"
                value={payload.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Specialization</label>
              <input
                type="text"
                placeholder="Strength Training"
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                name="specialization"
                value={payload.specialization}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Salary</label>
              <input
                type="number"
                placeholder="Enter salary"
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                name="salary"
                value={payload.salary}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Joining Date</label>
              <input
                type="date"
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                name="joiningDate"
                value={payload.joiningDate}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t p-6">
          <button
            type="button"
            onClick={handleClose}
            className="px-5 py-2 rounded-lg border hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 rounded-lg bg-black text-white hover:bg-gray-800"
          >
            {loading
              ? isEdit
                ? "Updating..."
                : "Saving..."
              : isEdit
                ? "Update Trainer"
                : "Save Trainer"}
          </button>
        </div>
      </form>
    </div>
  );
}
