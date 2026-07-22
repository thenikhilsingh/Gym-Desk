const {
  addPlan,
  getAllPlans,
  getPlanStats,
  editPlanById,
  getPlanById,
  updateIsActiveToggle,
  deletePlanById,
} = require("../db/queries");

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

const updatePlan = async (req, res) => {
  try {
    const { planName, duration, price, description, isActive } = req.body;
    const { planId } = req.params;

    if (!req.user.is_admin) {
      return res.status(403).json({
        message: "Only admins are allowed.",
      });
    }

    const updatedPlan = await editPlanById(
      planId,
      planName,
      duration,
      price,
      description,
      isActive,
    );
    return res
      .status(200)
      .json({ message: "plan updated successfully", updatedPlan });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

const getPlan = async (req, res) => {
  try {
    const { planId } = req.params;
    const plan = await getPlanById(planId);
    return res.status(200).json({ message: "plan fetched successfully", plan });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

const editActiveStatus = async (req, res) => {
  try {
    const { planId } = req.params;
    const { isActive } = req.body;
    if (!req.user.is_admin) {
      return res.status(403).json({
        message: "Only admins are allowed.",
      });
    }

    const updateStatus = await updateIsActiveToggle(planId, isActive);
    return res
      .status(200)
      .json({ message: "isActive toggle updated successfully", updateStatus });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

const deletePlan = async (req, res) => {
  try {
    const { planId } = req.params;

    if (!req.user.is_admin) {
      return res.status(403).json({
        message: "Only admins are allowed.",
      });
    }
    const deletedPlan = await deletePlanById(planId);
    return res
      .status(200)
      .json({ message: "plan deleted successfully", deletedPlan });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

module.exports = {
  createPlan,
  getPlans,
  getStatsCardCount,
  updatePlan,
  getPlan,
  editActiveStatus,
  deletePlan,
};
