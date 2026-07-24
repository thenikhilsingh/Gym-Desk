const pool = require("../db/pool");

const getUserbyEmail = async (email) => {
  const user = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
  return user.rows[0];
};

const getUserbyEmailButWithoutPassword = async (email) => {
  const user = await pool.query(
    "SELECT id,first_name,last_name,email,is_admin,created_at FROM users WHERE email=$1",
    [email],
  );
  return user.rows[0];
};

const createUser = async (firstName, lastName, email, password) => {
  const create = await pool.query(
    "INSERT INTO users (first_name,last_name,email,password) VALUES ($1,$2,$3,$4)  RETURNING id, first_name, last_name, email, is_admin, created_at",
    [firstName, lastName, email, password],
  );
  return create.rows[0];
};

const addPlan = async (planName, duration, price, description, isActive) => {
  const create = await pool.query(
    `
    INSERT INTO plans (plan_name, duration, price, description, is_active)
    VALUES($1,$2,$3,$4,$5)
    RETURNING *
    `,
    [planName, duration, price, description, isActive],
  );
  return create.rows[0];
};

const getAllPlans = async () => {
  const plans = await pool.query("SELECT * FROM plans");
  return plans.rows;
};

const getPlanStats = async () => {
  const result = await pool.query(`
    SELECT
      MIN(price) AS lowest_price,
      MAX(duration) AS longest_duration
    FROM plans;
  `);

  return result.rows[0];
};

const editPlanById = async (
  planId,
  planName,
  duration,
  price,
  description,
  isActive,
) => {
  const update = await pool.query(
    `
    UPDATE plans
    SET plan_name = COALESCE($2, plan_name),
  duration = COALESCE($3, duration),
  price = COALESCE($4, price),
  description = COALESCE($5, description),
  is_active = COALESCE($6, is_active),
    updated_at = CURRENT_TIMESTAMP
    WHERE id=$1
    RETURNING *
    `,
    [planId, planName, duration, price, description, isActive],
  );
  return update.rows[0];
};

const getPlanById = async (planId) => {
  const plan = await pool.query("SELECT * FROM plans WHERE id=$1", [planId]);
  return plan.rows[0];
};

const updateIsActiveToggle = async (planId, isActive) => {
  const toggle = await pool.query(
    `
    UPDATE plans
    SET is_active=$2
    WHERE id=$1
    RETURNING *
    `,
    [planId, isActive],
  );
  return toggle.rows[0];
};

const deletePlanById = async (planId) => {
  const deletePlan = await pool.query(
    "DELETE FROM plans WHERE id=$1 RETURNING *",
    [planId],
  );
  return deletePlan.rows[0];
};

const getMembers = async () => {
  const members = await pool.query("SELECT * FROM members");
  return members.rows;
};

const createMember = async (
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
) => {
  const member = await pool.query(
    `
     INSERT INTO members (first_name, last_name, phone, gender, date_of_birth, address,emergency_contact_name, emergency_contact_phone, join_date, height, weight, profile_image_url,profile_image_public_id)
    VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
    RETURNING *
    `,
    [
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
    ],
  );
  return member.rows[0];
};

const updateMemberById = async (
  memberId,
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
) => {
  const updatedMember = await pool.query(
    `
    UPDATE members
    SET first_name = COALESCE($2, first_name),
last_name = COALESCE($3, last_name),
phone = COALESCE($4, phone),
gender = COALESCE($5, gender),
date_of_birth = COALESCE($6, date_of_birth),
address = COALESCE($7, address),
emergency_contact_name = COALESCE($8, emergency_contact_name),
emergency_contact_phone = COALESCE($9, emergency_contact_phone),
join_date = COALESCE($10, join_date),
height = COALESCE($11, height),
weight = COALESCE($12, weight),
profile_image_url = COALESCE($13, profile_image_url),
profile_image_public_id = COALESCE($14, profile_image_public_id)
WHERE id=$1 RETURNING *
    `,
    [
      memberId,
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
    ],
  );
  return updatedMember.rows[0];
};

const getMemberById = async (memberId) => {
  const member = await pool.query("SELECT * FROM members WHERE id=$1", [
    memberId,
  ]);
  return member.rows[0];
};

const deleteMemberById = async (memberId) => {
  const member = await pool.query(
    "DELETE FROM members WHERE id=$1 RETURNING *",
    [memberId],
  );
  return member.rows[0];
};

const getAllMemberships = async () => {
  const memberships = await pool.query(`
    SELECT member_memberships.*,
    members.first_name AS memberFirstName,
    members.last_name AS memberLastName,
    plans.plan_name AS planName
    FROM member_memberships
    JOIN members ON member_memberships.member_id=members.id
    JOIN plans ON member_memberships.plan_id=plans.id
    `);
  return memberships.rows;
};

const Addmembership = async (
  memberId,
  planId,
  startDate,
  endDate,
  amountPaid,
  paymentStatus,
  notes,
) => {
  const membership = await pool.query(
    `
    INSERT INTO member_memberships (member_id, plan_id, start_date, end_date, amount_paid, payment_status,notes)
    VALUES ($1, $2, $3,$4, $5,$6, $7)
    RETURNING *
    `,
    [memberId, planId, startDate, endDate, amountPaid, paymentStatus, notes],
  );
  return membership.rows[0];
};

const getActiveMembershipByMemberId = async (memberId) => {
  const activeMembership = await pool.query(
    `
SELECT *
FROM member_memberships
WHERE member_id = $1
AND is_cancelled = FALSE
AND end_date >= CURRENT_DATE;
    `,
    [memberId],
  );
  return activeMembership.rows[0];
};

const getMemberOfTheMembershipById = async (membershipId) => {
  const member = await pool.query(
    "SELECT member_id FROM member_memberships WHERE id=$1",
    [membershipId],
  );
  return member.rows[0];
};

const getStartDateOfTheMembershipById = async (membershipId) => {
  const startDate = await pool.query(
    "SELECT start_date FROM member_memberships WHERE id=$1",
    [membershipId],
  );
  return startDate.rows[0];
};

const updateMembershipById = async (
  membershipId,
  memberId,
  planId,
  startDate,
  endDate,
  amountPaid,
  paymentStatus,
  notes,
) => {
  const membership = await pool.query(
    `
    UPDATE member_memberships
    SET member_id = COALESCE($2, member_id),
    plan_id=COALESCE($3, plan_id),
    start_date=COALESCE($4, start_date),
    end_date=COALESCE($5, end_date),
    amount_paid=COALESCE($6, amount_paid),
    payment_status=COALESCE($7, payment_status),
    notes=COALESCE($8, notes)
    WHERE id=$1 RETURNING *
    `,
    [
      membershipId,
      memberId,
      planId,
      startDate,
      endDate,
      amountPaid,
      paymentStatus,
      notes,
    ],
  );
  return membership.rows[0];
};

const getMembershipById = async (membershipId) => {
  const membership = await pool.query(
    "SELECT * FROM member_memberships WHERE id=$1",
    [membershipId],
  );
  return membership.rows[0];
};

const cancelMembershipById = async (membershipId) => {
  const membership = await pool.query(
    `
    UPDATE member_memberships
    SET is_cancelled=true
    WHERE id=$1 RETURNING *
    `,
    [membershipId],
  );
  return membership.rows[0];
};

const hasMembershipHistory = async (memberId) => {
  const result = await pool.query(
    `
    SELECT 1
    FROM member_memberships
    WHERE member_id = $1
    LIMIT 1;
    `,
    [memberId],
  );

  return result.rows.length > 0;
};

module.exports = {
  getUserbyEmail,
  getUserbyEmailButWithoutPassword,
  createUser,
  addPlan,
  getAllPlans,
  getPlanStats,
  editPlanById,
  getPlanById,
  updateIsActiveToggle,
  deletePlanById,
  getMembers,
  createMember,
  updateMemberById,
  getMemberById,
  deleteMemberById,
  getAllMemberships,
  Addmembership,
  getActiveMembershipByMemberId,
  getMemberOfTheMembershipById,
  getStartDateOfTheMembershipById,
  updateMembershipById,
  getMembershipById,
  cancelMembershipById,
  hasMembershipHistory,
};
