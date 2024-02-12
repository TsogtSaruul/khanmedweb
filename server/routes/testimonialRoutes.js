import express from "express";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import {
  getAllTestimonialsController,
  getTestimonialController,
  createTestimonialController,
  updateTestimonialController,
  deleteTestimonialController,
} from "../controllers/testimonialController.js";

const router = express.Router();

router.get("/get-all-testimonials", getAllTestimonialsController);
router.get("/get-testimonial/:id", getTestimonialController);
router.post("/create-testimonial", requireSignIn, isAdmin, createTestimonialController);
router.patch("/update-testimonial/:id", requireSignIn, isAdmin, updateTestimonialController);
router.delete("/delete-testimonial/:id", requireSignIn, isAdmin, deleteTestimonialController);

export default router;
