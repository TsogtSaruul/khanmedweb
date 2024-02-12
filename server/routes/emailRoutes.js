import express from "express";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import {
  getAllEmailsController,
  getEmailController,
  createEmailController,
  updateEmailController,
  deleteEmailController,
} from "../controllers/emailController.js";

const router = express.Router();

router.get("/get-all-emails", getAllEmailsController);
router.get("/get-email/:id", getEmailController);
router.post("/create-email", requireSignIn, isAdmin, createEmailController);
router.patch("/update-email/:id", requireSignIn, isAdmin, updateEmailController);
router.delete("/delete-email/:id", requireSignIn, isAdmin, deleteEmailController);

export default router;
