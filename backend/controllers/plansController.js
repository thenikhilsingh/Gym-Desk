const { addPlan } = require("../db/queries");

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

module.exports = { createPlan };
