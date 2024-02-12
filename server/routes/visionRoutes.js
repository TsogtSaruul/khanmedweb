import express from "express";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import {
  getAllVisionsController,
  getVisionController,
  createVisionController,
  updateVisionController,
  deleteVisionController,
} from "../controllers/visionController.js";

const router = express.Router();

router.get("/get-all-visions", getAllVisionsController);
router.get("/get-vision/:id", getVisionController);
router.post("/create-vision", requireSignIn, isAdmin, createVisionController);
router.patch("/update-vision/:id", requireSignIn, isAdmin, updateVisionController);
router.delete("/delete-vision/:id", requireSignIn, isAdmin, deleteVisionController);

export default router;
