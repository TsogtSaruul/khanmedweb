import express from "express";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import {
  getAllCallactionsController,
  getCallactionController,
  createCallactionController,
  updateCallactionController,
  deleteCallactionController,
} from "../controllers/callactionController.js";

const router = express.Router();

router.get("/get-all-callactions", getAllCallactionsController);
router.get("/get-callaction/:id", getCallactionController);
router.post("/create-callaction", requireSignIn, isAdmin, createCallactionController);
router.patch("/update-callaction/:id", requireSignIn, isAdmin, updateCallactionController);
router.delete("/delete-callaction/:id", requireSignIn, isAdmin, deleteCallactionController);

export default router;
