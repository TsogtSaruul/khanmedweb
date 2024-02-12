import express from "express";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import {
  getAllAboutsController,
  getAboutController,
  createAboutController,
  updateAboutController,
  deleteAboutController,
} from "../controllers/aboutController.js";

const router = express.Router();

router.get("/get-all-abouts", getAllAboutsController);
router.get("/get-about/:id", getAboutController);
router.post("/create-about", requireSignIn, isAdmin, createAboutController);
router.patch("/update-about/:id", requireSignIn, isAdmin, updateAboutController);
router.delete("/delete-about/:id", requireSignIn, isAdmin, deleteAboutController);

export default router;
