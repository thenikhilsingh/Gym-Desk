const { getTrainers } = require("../db/queries");

const getAllTrainers = async (req, res) => {
  try {
    const trainers = await getTrainers();
    return res
      .status(200)
      .json({ message: "trainers fetched successfully", trainers });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getAllTrainers };
