import UserModel from "../models/userModel.js";
import {
  getUserFromToken,
  loginUser,
  registerUser,
  getAllUsersFromDB,
} from "../services/authService.js";

export const register = async (req, res) => {
  const { username, firstName, lastName, email, password, role } = req.body;
  if (!username || !firstName || !lastName || !email || !password || !role) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  const user = new UserModel({
    username,
    firstName,
    lastName,
    email,
    password,
    role
  });

  try {
    const response = await registerUser(user);
    if (response.success) {
      return res.status(200).json(response);
    } else {
      return res.status(400).json(response);
    }
  } catch (error) {
    return {
      success: false,
      message: "Registration failed.",
    };
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email and password are required" });
  }

  try {
    const response = await loginUser(email, password);
    if (response.success) {
      return res.status(200).json(response);
    } else {
      return res.status(400).json(response);
    }
  } catch (error) {
    return {
      success: false,
      message: "Login failed.",
    };
  }
};

export const getUserFromTokenController = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }

  try {
    const response = await getUserFromToken(token);
    if (response.success) {
      return res.status(200).json(response);
    } else {
      return res.status(400).json(response);
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to retrieve user data." });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const response = await getAllUsersFromDB();
    if (response.success) {
      return res.status(200).json(response);
    } else {
      return res.status(500).json(response);
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch users", error });
  }
};