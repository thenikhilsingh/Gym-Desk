const {
  getAllMemberships,
  getPlanById,
  Addmembership,
  getActiveMembershipByMemberId,
  getMemberOfTheMembershipById,
  getStartDateOfTheMembershipById,
  getMembershipById,
  updateMembershipById,
} = require("../db/queries");

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

const insertMembership = async (req, res) => {
  try {
    if (!req.user.is_admin) {
      return res.status(403).json({
        message: "Only admins are allowed.",
      });
    }

    const { memberId, planId, startDate, amountPaid, paymentStatus, notes } =
      req.body;

    const existingMembership = await getActiveMembershipByMemberId(memberId);
    if (existingMembership) {
      return res.status(400).json({
        message: "This member already has an active membership.",
      });
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedStartDate = new Date(startDate);
    if (selectedStartDate < today) {
      return res.status(400).json({
        message: "Start date cannot be in the past.",
      });
    }

    const plan = await getPlanById(planId);
    if (!plan) {
      return res.status(400).json({ message: "Select a valid plan" });
    }
    const planDuration = plan.duration;
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + planDuration);

    const membership = await Addmembership(
      memberId,
      planId,
      startDate,
      endDate,
      amountPaid,
      paymentStatus,
      notes,
    );
    return res
      .status(201)
      .json({ message: "membership created successfully", membership });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const editMembership = async (req, res) => {
  try {
    if (!req.user.is_admin) {
      return res.status(403).json({
        message: "Only admins are allowed.",
      });
    }
    const { memberId, planId, startDate, amountPaid, paymentStatus, notes } =
      req.body;
    const { membershipId } = req.params;

    const member = await getMemberOfTheMembershipById(membershipId);
    if (member.member_id !== Number(memberId)) {
      return res.status(400).json({
        message: "member can't be edited",
      });
    }

    const prevStartDate = await getStartDateOfTheMembershipById(membershipId);
    const dbDate = new Date(prevStartDate.start_date)
      .toISOString()
      .split("T")[0];
    if (dbDate !== startDate) {
      return res.status(400).json({
        message: "start date can't be edited",
      });
    }

    const plan = await getPlanById(planId);
    if (!plan) {
      return res.status(400).json({ message: "Select a valid plan" });
    }
    const planDuration = plan.duration;
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + planDuration);

    const membership = await updateMembershipById(
      membershipId,
      memberId,
      planId,
      startDate,
      endDate,
      amountPaid,
      paymentStatus,
      notes,
    );
    return res
      .status(200)
      .json({ message: "membership updated successfully", membership });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getTheMembership = async (req, res) => {
  try {
    const { membershipId } = req.params;
    const membership = await getMembershipById(membershipId);
    return res
      .status(200)
      .json({ message: "membership fetched successfully", membership });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getMemberships,
  insertMembership,
  editMembership,
  getTheMembership,
};
