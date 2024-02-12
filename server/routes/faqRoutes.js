import express from "express";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import {
  getAllFaqsController,
  getFaqController,
  createFaqController,
  updateFaqController,
  deleteFaqController,
} from "../controllers/faqController.js";

const router = express.Router();

router.get("/get-all-faqs", getAllFaqsController);
router.get("/get-faq/:id", getFaqController);
router.post("/create-faq", requireSignIn, isAdmin, createFaqController);
router.patch("/update-faq/:id", requireSignIn, isAdmin, updateFaqController);
router.delete("/delete-faq/:id", requireSignIn, isAdmin, deleteFaqController);

export default router;
