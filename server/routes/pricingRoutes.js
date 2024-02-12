import express from "express";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import {
  getAllPricingsController,
  getPricingController,
  createPricingController,
  updatePricingController,
  deletePricingController,
} from "../controllers/pricingController.js";

const router = express.Router();

router.get("/get-all-pricings", getAllPricingsController);
router.get("/get-pricing/:id", getPricingController);
router.post("/create-pricing", requireSignIn, isAdmin, createPricingController);
router.patch("/update-pricing/:id", requireSignIn, isAdmin, updatePricingController);
router.delete("/delete-pricing/:id", requireSignIn, isAdmin, deletePricingController);

export default router;
