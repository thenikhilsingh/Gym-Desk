const { getMembers, createMember } = require("../db/queries");

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
      profileImage,
    } = req.body;

    if (!req.user.is_admin) {
      return res.status(403).json({
        message: "Only admins are allowed.",
      });
    }

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
      profileImage,
    );

    return res
      .status(201)
      .json({ message: "member added successfully", member });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getAllMembers, addMember };
