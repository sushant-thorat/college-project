import express from "express";
import {
  fetchClientFeedbacks,
  createClientFeedback,
  modifyClientFeedback,
  removeClientFeedback,
} from "../controllers/clientController.js";

const router = express.Router();

router.get("/", fetchClientFeedbacks);
router.post("/", createClientFeedback);
router.put("/:id", modifyClientFeedback);
router.delete("/:id", removeClientFeedback);

export default router;
