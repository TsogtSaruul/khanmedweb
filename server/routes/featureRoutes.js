import express from "express";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import {
  getAllFeaturesController,
  getFeatureController,
  createFeatureController,
  updateFeatureController,
  deleteFeatureController,
} from "../controllers/featureController.js";

const router = express.Router();

router.get("/get-all-features", getAllFeaturesController);
router.get("/get-feature/:id", getFeatureController);
router.post("/create-feature", requireSignIn, isAdmin, createFeatureController);
router.patch("/update-feature/:id", requireSignIn, isAdmin, updateFeatureController);
router.delete("/delete-feature/:id", requireSignIn, isAdmin, deleteFeatureController);

export default router;
