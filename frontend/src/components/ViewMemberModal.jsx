import React, { useEffect, useState } from "react";
import {
  X,
  User,
  Phone,
  Calendar,
  MapPin,
  Shield,
  Ruler,
  Weight,
} from "lucide-react";
import useAxios from "../hooks/useAxios";
import useFormatDate from "../hooks/useFormatDate";

export default function ViewMemberModal({
  openViewModal,
  closeModal,
  selectedMember,
}) {
  const api = useAxios();
  const { formatDate } = useFormatDate();

  const [member, setMember] = useState(null);

  const getMemberDetails = async () => {
    try {
      const response = await api.get(`/api/members/${selectedMember}`);
      setMember(response.data.member);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (openViewModal && selectedMember) {
      getMemberDetails();
    }
  }, [openViewModal, selectedMember]);

  if (!openViewModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-5">
          <h2 className="text-2xl font-bold">Member Details</h2>

          <button
            onClick={closeModal}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <X size={22} />
          </button>
        </div>

        {!member ? (
          <div className="p-10 text-center">Loading...</div>
        ) : (
          <>
            {/* Profile */}
            <div className="flex flex-col items-center py-8 border-b">
              <img
                src={
                  member.profile_image_url ||
                  "https://placehold.co/150x150?text=User"
                }
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 shadow"
              />

              <h2 className="mt-4 text-2xl font-bold">
                {member.first_name} {member.last_name}
              </h2>

              <p className="text-gray-500">Member ID #{member.id}</p>
            </div>

            {/* Body */}
            <div className="p-6 space-y-8">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <User size={20} />
                  Personal Information
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <InfoCard title="First Name" value={member.first_name} />

                  <InfoCard title="Last Name" value={member.last_name || "-"} />

                  <InfoCard title="Gender" value={member.gender} />

                  <InfoCard
                    title="Date of Birth"
                    value={formatDate(member.date_of_birth)}
                  />

                  <InfoCard
                    title="Phone"
                    value={member.phone}
                    icon={<Phone size={16} />}
                  />

                  <InfoCard
                    title="Join Date"
                    value={formatDate(member.join_date)}
                    icon={<Calendar size={16} />}
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <MapPin size={20} />
                  Address
                </h3>

                <div className="rounded-xl bg-gray-50 border p-5">
                  {member.address || "-"}
                </div>
              </div>

              {/* Emergency Contact */}
              <div>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Shield size={20} />
                  Emergency Contact
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <InfoCard
                    title="Contact Name"
                    value={member.emergency_contact_name || "-"}
                  />

                  <InfoCard
                    title="Phone"
                    value={member.emergency_contact_phone || "-"}
                  />
                </div>
              </div>

              {/* Physical Details */}
              <div>
                <h3 className="text-lg font-bold mb-4">Physical Details</h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="rounded-xl border bg-gray-50 p-5">
                    <div className="flex items-center gap-2 text-gray-500 mb-2">
                      <Ruler size={18} />
                      Height
                    </div>

                    <h2 className="text-2xl font-bold">
                      {member.height || "-"} cm
                    </h2>
                  </div>

                  <div className="rounded-xl border bg-gray-50 p-5">
                    <div className="flex items-center gap-2 text-gray-500 mb-2">
                      <Weight size={18} />
                      Weight
                    </div>

                    <h2 className="text-2xl font-bold">
                      {member.weight || "-"} kg
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t px-6 py-4 flex justify-end">
              <button
                onClick={closeModal}
                className="rounded-lg bg-black px-6 py-2.5 text-white hover:bg-gray-800"
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

function InfoCard({ title, value, icon }) {
  return (
    <div className="rounded-xl border bg-gray-50 p-5">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
        {icon}
        {title}
      </div>

      <p className="text-lg font-semibold">{value || "-"}</p>
    </div>
  );
}
