const {
  getMembers,
  createMember,
  updateMemberById,
  getMemberById,
} = require("../db/queries");
const { uploadOnCloudinary, cloudinary } = require("../utils/cloudinary");

const getAllMembers = async (req, res) => {
  try {
    const allMembers = await getMembers();
    return res
      .status(200)
      .json({ message: "members fetched successfully", allMembers });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const addMember = async (req, res) => {
  try {
    if (!req.user.is_admin) {
      return res.status(403).json({
        message: "Only admins are allowed.",
      });
    }
    const {
      firstName,
      lastName,
      phone,
      gender,
      dob,
      address,
      emergencyContactName,
      emergencyContactPhone,
      joinDate,
      height,
      weight,
    } = req.body;

    const localPath = req.file?.path;
    if (!localPath) {
      return res.status(400).json({
        message: "Please upload a file",
      });
    }

    const uploadedFile = await uploadOnCloudinary(localPath);
    if (!uploadedFile) {
      return res.status(400).json({
        message: "Upload failed",
      });
    }

    const profileImageURL = uploadedFile.secure_url;
    const profileImagePublicId = uploadedFile.public_id;

    const member = await createMember(
      firstName,
      lastName,
      phone,
      gender,
      dob,
      address,
      emergencyContactName,
      emergencyContactPhone,
      joinDate,
      height,
      weight,
      profileImageURL,
      profileImagePublicId,
    );

    return res
      .status(201)
      .json({ message: "member added successfully", member });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const editMember = async (req, res) => {
  try {
    if (!req.user.is_admin) {
      return res.status(403).json({
        message: "Only admins are allowed.",
      });
    }

    const {
      firstName,
      lastName,
      phone,
      gender,
      dob,
      address,
      emergencyContactName,
      emergencyContactPhone,
      joinDate,
      height,
      weight,
    } = req.body;
    const { memberId } = req.params;

    const member = await getMemberById(memberId);
    if (!member) {
      return res.status(404).json({
        message: "Member not found",
      });
    }

    let profileImageURL = null;
    let profileImagePublicId = null;
    const localPath = req.file?.path;
    if (localPath) {
      const uploadedFile = await uploadOnCloudinary(localPath);
      if (!uploadedFile) {
        return res.status(400).json({
          message: "Upload failed",
        });
      }
      // Delete previous image if it exists
      if (member.profile_image_public_id) {
        await cloudinary.uploader.destroy(member.profile_image_public_id);
      }
      profileImageURL = uploadedFile.secure_url;
      profileImagePublicId = uploadedFile.public_id;
    }

    const updateMember = await updateMemberById(
      memberId,
      firstName ?? null,
      lastName ?? null,
      phone ?? null,
      gender ?? null,
      dob ?? null,
      address ?? null,
      emergencyContactName ?? null,
      emergencyContactPhone ?? null,
      joinDate ?? null,
      height ?? null,
      weight ?? null,
      profileImageURL ?? null,
      profileImagePublicId ?? null,
    );

    return res
      .status(200)
      .json({ message: "member updated successfully", updateMember });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getMemberDetails = async (req, res) => {
  try {
    const { memberId } = req.params;
    const member = await getMemberById(memberId);
    return res
      .status(200)
      .json({ message: "member fetched successfully", member });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getAllMembers, addMember, editMember, getMemberDetails };
