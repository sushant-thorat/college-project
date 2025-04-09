import bcrypt from "bcryptjs";
import { pool } from "../config/db.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = "thisismytokenkeyhereiputaftergetrandom";

export const registerUser = async (user) => {
  try {
    const hashPassword = await bcrypt.hash(user.password, 10);
    const query = `INSERT INTO users(username,first_name,last_name,email,password,role) VALUES (?,?,?,?,?,?)`;
    const { username, firstName, lastName, email, role } = user;
    const values = [username, firstName, lastName, email, hashPassword, role];

    await pool.query(query, values);
    return { success: true, message: "User Registered Successfully" };
  } catch (error) {
    return { success: false, message: "User Registered Failure" };
  }
};

export const loginUser = async (email, password) => {
  try {
    const [rows] = await pool.query(`SELECT * from users where email=?`, [
      email,
    ]);
    if (rows.length === 0) {
      return { success: false, message: "User not found" };
    }
    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return { success: false, message: "Password incorrect" };
    }
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "3h",
    });
    return {
      success: true,
      message: "User logged in successfully",
      token,
      id: user.id,
    };
  } catch (error) {
    return {
      success: false,
      message: "Login Failure. Please try again later",
      error: error,
    };
  }
};

export const getUserFromToken = async (token) => {
  try {
    const trimmedToken = token.trim();
    const decodedToken = jwt.verify(trimmedToken, JWT_SECRET);
    const [rows] = await pool.query(
      `SELECT id, username, first_name, last_name, email, role from users where email=?`,
      [decodedToken.email]
    );
    if (rows.length === 0) {
      return { success: false, message: "User not found" };
    }
    return { success: true, data: rows[0] };
  } catch (error) {
    return {
      success: false,
      message: "Token invalid or expired",
      error: error,
    };
  }
};

export const getAllUsersFromDB = async () => {
  try {
    const [rows] = await pool.query(
      `SELECT id, username, first_name, last_name, email, role FROM users`
    );
    return { success: true, data: rows };
  } catch (error) {
    console.error("Error fetching users:", error);
    return { success: false, message: "Failed to fetch users", error };
  }
};
