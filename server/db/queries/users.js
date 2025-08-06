import db from "../client.js"
import bcrypt from "bcrypt";

// Create new user with hashed password
export async function createUser(email, password) {
  const sql = `
  INSERT INTO users
    (email, password)
  VALUES
    ($1, $2)
  RETURNING *
  `;
  const hashedPassword = await bcrypt.hash(password, 10);
  const {
    rows: [user],
  } = await db.query(sql, [email, hashedPassword]);
  return user;
}

// Return user if found using email and password
export async function getUserByEmailAndPassword(email, password) {
  const sql = `
  SELECT *
  FROM users
  WHERE email = $1
  `;
  const {
    rows: [user],
  } = await db.query(sql, [email]);
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;

  return user;
}

// Get user by ID
export async function getUserById(id) {
    const sql = `
    SELECT *
    FROM users
    WHERE id = $1 
    `;
    const {
        rows: [user],
    } = await db.query(sql, [id]);
    return user;
}

// Get all users in activity
export async function getUsersByActivityId(activityId) {
  const sql = `
  SELECT users.*
  FROM users 
  JOIN user_activities ON users.id = user_activities.user_id
  WHERE user_activities.activity_id = $1
  `;
  const { rows } = await db.query(sql, [activityId]);
  return rows;
}