import express from "express";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import {
  getAllSlidersController,
  getSliderController,
  createSliderController,
  updateSliderController,
  deleteSliderController,
} from "../controllers/sliderController.js";

const router = express.Router();

router.get("/get-all-sliders", getAllSlidersController);
router.get("/get-slider/:id", getSliderController);
router.post("/create-slider", requireSignIn, isAdmin, createSliderController);
router.patch("/update-slider/:id", requireSignIn, isAdmin, updateSliderController);
router.delete("/delete-slider/:id", requireSignIn, isAdmin, deleteSliderController);

export default router;
