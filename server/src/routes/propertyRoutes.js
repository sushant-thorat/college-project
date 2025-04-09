import express from "express";
import {
  fetchProperties,
  createProperty,
  modifyProperty,
  removeProperty,
} from "../controllers/propertyController.js";

const router = express.Router();

router.get("/", fetchProperties);
router.post("/", createProperty);
router.put("/:id", modifyProperty);
router.delete("/:id", removeProperty);

export default router;
