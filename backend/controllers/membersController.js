const { getMembers } = require("../db/queries");

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

module.exports = { getAllMembers };
