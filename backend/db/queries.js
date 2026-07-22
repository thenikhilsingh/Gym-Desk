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
};
