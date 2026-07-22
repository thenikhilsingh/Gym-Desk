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

module.exports = {
  getUserbyEmail,
  getUserbyEmailButWithoutPassword,
  createUser,
  addPlan,
  getAllPlans,
};
