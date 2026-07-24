const { getAllMemberships } = require("../db/queries");

const getMemberships = async (req, res) => {
  try {
    const memberships = await getAllMemberships();
    return res
      .status(200)
      .json({ message: "memberships fetched successfully", memberships });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getMemberships };
