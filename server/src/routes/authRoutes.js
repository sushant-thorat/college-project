import express from "express";
import {
  getUserFromTokenController,
  login,
  register,
  getAllUsers,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register-user", register);
router.post("/login-user", login);
router.get("/getUserData", getUserFromTokenController);
router.get("/getAllUsers", getAllUsers);

export default router;
