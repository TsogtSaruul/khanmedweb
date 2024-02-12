import express from "express";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import {
  getAllFunfactsController,
  getFunfactController,
  createFunfactController,
  updateFunfactController,
  deleteFunfactController,
} from "../controllers/funfactController.js";

const router = express.Router();

router.get("/get-all-funfacts", getAllFunfactsController);
router.get("/get-funfact/:id", getFunfactController);
router.post("/create-funfact", requireSignIn, isAdmin, createFunfactController);
router.patch("/update-funfact/:id", requireSignIn, isAdmin, updateFunfactController);
router.delete("/delete-funfact/:id", requireSignIn, isAdmin, deleteFunfactController);

export default router;
