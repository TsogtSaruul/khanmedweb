import express from "express";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import {
  getAllSocialsController,
  getSocialController,
  createSocialController,
  updateSocialController,
  deleteSocialController,
} from "../controllers/socialController.js";

const router = express.Router();

router.get("/get-all-socials", getAllSocialsController);
router.get("/get-social/:id", getSocialController);
router.post("/create-social", requireSignIn, isAdmin, createSocialController);
router.patch("/update-social/:id", requireSignIn, isAdmin, updateSocialController);
router.delete("/delete-social/:id", requireSignIn, isAdmin, deleteSocialController);

export default router;
