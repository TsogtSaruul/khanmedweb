import express from "express";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import {
  getAllPortfoliosController,
  getPortfolioController,
  createPortfolioController,
  updatePortfolioController,
  deletePortfolioController,
} from "../controllers/portfolioController.js";

const router = express.Router();

router.get("/get-all-portfolios", getAllPortfoliosController);
router.get("/get-portfolio/:id", getPortfolioController);
router.post("/create-portfolio", requireSignIn, isAdmin, createPortfolioController);
router.patch("/update-portfolio/:id", requireSignIn, isAdmin, updatePortfolioController);
router.delete("/delete-portfolio/:id", requireSignIn, isAdmin, deletePortfolioController);

export default router;
