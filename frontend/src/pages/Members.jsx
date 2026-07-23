import React, { useEffect, useState } from "react";
import { Plus, Users, UserCheck, UserX, Pencil, Trash2 } from "lucide-react";
import MemberModal from "../components/MemberModal";
import useAxios from "../hooks/useAxios";
import useFormatDate from "../hooks/useFormatDate";
import DeleteMemberModal from "../components/DeleteMemberModal";

export default function Members() {
  const api = useAxios();
  const { formatDate } = useFormatDate();
  const [openMemberModal, setOpenMemberModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const closeModal = () => {
    setOpenMemberModal(false);
  };

  const [members, setMembers] = useState([]);
  const getMembers = async () => {
    try {
      const response = await api.get("/api/members");
      setMembers(response.data.allMembers);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMembers();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Members</h1>
          <p className="text-gray-500">Manage all gym members.</p>
        </div>

        <button
          onClick={() => {
            setIsEdit(false);
            setSelectedMember(null);
            setOpenMemberModal(true);
          }}
          className="flex items-center gap-2 bg-black text-white px-5 py-3 rounded-lg hover:bg-gray-800"
        >
          <Plus size={18} />
          Add Member
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        <div className="bg-white rounded-xl shadow p-5">
          <Users size={28} className="text-blue-600 mb-3" />
          <h2 className="text-3xl font-bold">{members.length}</h2>
          <p className="text-gray-500">Total Members</p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <UserCheck size={28} className="text-green-600 mb-3" />
          <h2 className="text-3xl font-bold">0</h2>
          <p className="text-gray-500">Active Members</p>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <UserX size={28} className="text-red-600 mb-3" />
          <h2 className="text-3xl font-bold">0</h2>
          <p className="text-gray-500">Inactive Members</p>
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr className="text-left">
                  <th className="p-4">Name</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Gender</th>
                  <th className="p-4">Join Date</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {!members.length ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="text-center py-8 text-gray-500 font-medium"
                    >
                      No members found
                    </td>
                  </tr>
                ) : (
                  members.map((member) => {
                    return (
                      <tr key={member.id} className="border-b hover:bg-gray-50">
                        <td className="p-4 font-medium">{`${member.first_name} ${member.last_name}`}</td>
                        <td className="p-4">{member.phone}</td>
                        <td className="p-4">{member.gender}</td>
                        <td className="p-4">{formatDate(member.join_date)}</td>
                        <td className="p-4">
                          <div className="flex justify-center gap-3">
                            <button
                              onClick={() => {
                                setIsEdit(true);
                                setSelectedMember(member.id);
                                setOpenMemberModal(true);
                              }}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <Pencil size={18} />
                            </button>

                            <button
                              onClick={() => {
                                setSelectedMember(member.id);
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
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <MemberModal
        openMemberModal={openMemberModal}
        closeModal={closeModal}
        isEdit={isEdit}
        selectedMember={selectedMember}
        getMembers={getMembers}
      />
      <DeleteMemberModal
        openDeleteModal={openDeleteModal}
        closeModal={() => setOpenDeleteModal(false)}
        selectedMember={selectedMember}
        getMembers={getMembers}
      />
    </div>
  );
}
