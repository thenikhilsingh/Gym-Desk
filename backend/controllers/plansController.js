const { addPlan, getAllPlans, getPlanStats } = require("../db/queries");

const createPlan = async (req, res) => {
  try {
    const { planName, duration, price, description, isActive } = req.body;

    if (!req.user.is_admin) {
      return res.status(403).json({
        message: "Only admins are allowed.",
      });
    }

    const createdPlan = await addPlan(
      planName,
      duration,
      price,
      description,
      isActive,
    );
    return res
      .status(201)
      .json({ message: "plan created successfully", createdPlan });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server error" });
  }
};

const getPlans = async (req, res) => {
  try {
    const plans = await getAllPlans();
    return res
      .status(200)
      .json({ message: "plan fetched successfully", plans });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

const getStatsCardCount = async (req, res) => {
  try {
    const stats = await getPlanStats();
    return res
      .status(200)
      .json({ message: "Stats fetched successfully", stats });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};
module.exports = { createPlan, getPlans, getStatsCardCount };
