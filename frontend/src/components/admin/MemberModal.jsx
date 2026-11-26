import { useEffect, useRef, useState } from "react";
import { Camera, X } from "lucide-react";
import useAxios from "../../hooks/useAxios";
import { toast } from "react-toastify";
import useFormatDate from "../../hooks/useFormatDate";

export default function MemberModal({
  openMemberModal,
  closeModal,
  isEdit,
  getMembers,
  selectedMember,
  getMemberStats,
}) {
  const api = useAxios();
  const { formatDate } = useFormatDate();
  const videoRef = useRef(null);
  const cameraInputRef = useRef(null);
  const [payload, setPayload] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    gender: "",
    dob: "",
    address: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    joinDate: "",
    height: "",
    weight: "",
    profileImage: null,
  });
  const [memberDetails, setMemberDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);

  useEffect(() => {
    if (videoRef.current && cameraStream) {
      videoRef.current.srcObject = cameraStream;
    }

    return () => {
      cameraStream?.getTracks().forEach((track) => track.stop());
    };
  }, [cameraStream]);

  const stopCamera = () => {
    cameraStream?.getTracks().forEach((track) => track.stop());
    setCameraStream(null);
  };

  const openCamera = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      cameraInputRef.current?.click();
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
        audio: false,
      });
      setCameraStream(stream);
    } catch (error) {
      console.error("Could not open member photo camera:", error);
      toast.error("Camera access failed. Allow camera permission or choose an image.");
    }
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    if (!video?.videoWidth) {
      toast.error("Camera is not ready yet.");
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");
    if (!context) {
      toast.error("Could not capture the photo.");
      return;
    }

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          toast.error("Could not capture the photo.");
          return;
        }

        setPayload((currentPayload) => ({
          ...currentPayload,
          profileImage: new File([blob], `member-${Date.now()}.jpg`, {
            type: blob.type,
          }),
        }));
        stopCamera();
      },
      "image/jpeg",
      0.9,
    );
  };

  const handleClose = () => {
    stopCamera();
    closeModal();
    setPayload({
      firstName: "",
      lastName: "",
      phone: "",
      gender: "",
      dob: "",
      address: "",
      emergencyContactName: "",
      emergencyContactPhone: "",
      joinDate: "",
      height: "",
      weight: "",
      profileImage: null,
    });
  };
  const getMemberDetails = async () => {
    try {
      const response = await api.get(`/api/members/${selectedMember}`);
      const member = response.data.member;
      setMemberDetails(member);
      setPayload({
        ...payload,
        firstName: member.first_name,
        lastName: member.last_name,
        phone: member.phone,
        gender: member.gender,
        dob: formatDate(member.date_of_birth, "input"),
        address: member.address,
        emergencyContactName: member.emergency_contact_name,
        emergencyContactPhone: member.emergency_contact_phone,
        joinDate: formatDate(member.join_date, "input"),
        height: member.height,
        weight: member.weight,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isEdit && openMemberModal && selectedMember) {
      getMemberDetails();
    }
  }, [isEdit, openMemberModal, selectedMember]);

  const handleChange = (e) => {
    setPayload({
      ...payload,
      [e.target.name]:
        e.target.type === "number"
          ? e.target.value === ""
            ? ""
            : Number(e.target.value)
          : e.target.type === "file"
            ? e.target.files[0]
            : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      const appendField = (name, value) =>
        formData.append(name, value ?? "");
      appendField("firstName", payload.firstName);
      appendField("lastName", payload.lastName);
      appendField("phone", payload.phone);
      appendField("gender", payload.gender);
      appendField("dob", payload.dob);
      appendField("address", payload.address);
      appendField("emergencyContactName", payload.emergencyContactName);
      appendField("emergencyContactPhone", payload.emergencyContactPhone);
      appendField("joinDate", payload.joinDate);
      appendField("height", payload.height);
      appendField("weight", payload.weight);
      if (payload.profileImage) {
        formData.append("profileImage", payload.profileImage);
      }
      if (isEdit) {
        const response = await api.patch(
          `/api/members/edit/${selectedMember}`,
          formData,
        );
        if (response.status === 200) {
          getMembers();
          getMemberStats();
          handleClose();
          toast.success(
            response?.data?.message || "Member updated Successfully!",
          );
        }
      } else {
        const response = await api.post("/api/members/add", formData);
        if (response.status === 201) {
          getMembers();
          getMemberStats();
          handleClose();
          toast.success(
            response?.data?.message || "Member added Successfully!",
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

  if (!openMemberModal) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-2xl font-bold">
            {isEdit ? "Edit Member" : "Add Member"}
          </h2>

          <button
            onClick={handleClose}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* First Name */}
          <div>
            <label className="block mb-2 font-medium">First Name</label>

            <input
              type="text"
              className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter first name"
              name="firstName"
              value={payload.firstName}
              onChange={handleChange}
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block mb-2 font-medium">Last Name</label>

            <input
              type="text"
              className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter last name"
              name="lastName"
              value={payload.lastName}
              onChange={handleChange}
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-2 font-medium">Phone</label>

            <input
              type="text"
              className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black"
              placeholder="9876543210"
              name="phone"
              value={payload.phone}
              onChange={handleChange}
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block mb-2 font-medium">Gender</label>

            <select
              name="gender"
              value={payload.gender}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* DOB */}
          <div>
            <label className="block mb-2 font-medium">Date of Birth</label>

            <input
              type="date"
              className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black"
              name="dob"
              value={payload.dob}
              onChange={handleChange}
            />
          </div>

          {/* Join Date */}
          <div>
            <label className="block mb-2 font-medium">Join Date</label>

            <input
              type="date"
              className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black"
              name="joinDate"
              value={payload.joinDate}
              onChange={handleChange}
            />
          </div>

          {/* Height */}
          <div>
            <label className="block mb-2 font-medium">Height (cm)</label>

            <input
              type="number"
              className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black"
              name="height"
              value={payload.height}
              onChange={handleChange}
            />
          </div>

          {/* Weight */}
          <div>
            <label className="block mb-2 font-medium">Weight (kg)</label>

            <input
              type="number"
              className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black"
              name="weight"
              value={payload.weight}
              onChange={handleChange}
            />
          </div>

          {/* Emergency Contact Name */}
          <div>
            <label className="block mb-2 font-medium">
              Emergency Contact Name
            </label>

            <input
              type="text"
              className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black"
              name="emergencyContactName"
              value={payload.emergencyContactName}
              onChange={handleChange}
            />
          </div>

          {/* Emergency Contact Phone */}
          <div>
            <label className="block mb-2 font-medium">
              Emergency Contact Phone
            </label>

            <input
              type="text"
              className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black"
              name="emergencyContactPhone"
              value={payload.emergencyContactPhone}
              onChange={handleChange}
            />
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block mb-2 font-medium">Address</label>

            <textarea
              rows={3}
              className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-black resize-none"
              placeholder="Enter address"
              name="address"
              value={payload.address}
              onChange={handleChange}
            />
          </div>

          {/* img preview */}
          {isEdit && memberDetails.profile_image_url && (
            <div className="mb-3">
              <p className="text-sm font-medium mb-2">Current Image</p>

              <img
                src={memberDetails.profile_image_url}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border"
              />
            </div>
          )}

          {/* Profile Image */}
          <div className="md:col-span-2">
            <label className="block mb-2 font-medium">Profile Image</label>

            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="file"
                className="w-full border rounded-lg px-4 py-2"
                name="profileImage"
                accept="image/*"
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={openCamera}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border px-4 py-2 hover:bg-gray-100"
              >
                <Camera size={18} />
                Take Photo
              </button>
            </div>
            <input
              ref={cameraInputRef}
              type="file"
              name="profileImage"
              accept="image/*"
              capture="environment"
              onChange={handleChange}
              className="hidden"
              tabIndex={-1}
            />
            {payload.profileImage && (
              <p className="mt-2 text-sm text-gray-600">
                Selected: {payload.profileImage.name}
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t px-6 py-4 flex justify-end gap-3">
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
                : "Adding..."
              : isEdit
                ? "Update Member"
                : "Add Member"}
          </button>
        </div>
      </form>
      {cameraStream && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="member-camera-title"
            className="w-full max-w-xl rounded-2xl bg-white p-4 shadow-xl"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 id="member-camera-title" className="text-lg font-semibold">
                Take Member Photo
              </h3>
              <button
                type="button"
                onClick={stopCamera}
                aria-label="Close camera"
                className="rounded-lg p-2 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="aspect-video w-full rounded-lg bg-black object-cover"
            />
            <div className="mt-4 flex justify-end gap-3">
              <button
                type="button"
                onClick={stopCamera}
                className="rounded-lg border px-5 py-2 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={capturePhoto}
                className="inline-flex items-center gap-2 rounded-lg bg-black px-5 py-2 text-white hover:bg-gray-800"
              >
                <Camera size={18} />
                Capture Photo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
