const pool = require("../db/pool");

const getUserbyEmail = async (email) => {
  const user = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
  return user.rows[0];
};

const createUser = async (firstName, lastName, email, password) => {
  const create = await pool.query(
    "INSERT INTO users (first_name,last_name,email,password) VALUES ($1,$2,$3,$4)  RETURNING id, first_name, last_name, email, is_admin, created_at",
    [firstName, lastName, email, password],
  );
  return create.rows[0];
};

module.exports = { getUserbyEmail, createUser };
