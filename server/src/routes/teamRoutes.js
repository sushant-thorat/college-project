import express from "express";
import {
  createTeamMember,
  fetchTeamMembers,
  modifyTeamMember,
  removeTeamMember,
} from "../controllers/teamController.js";

const router = express.Router();

router.post("/", createTeamMember);
router.get("/", fetchTeamMembers);
router.put("/:id", modifyTeamMember);
router.delete("/:id", removeTeamMember);

export default router;
