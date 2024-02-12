import express from "express";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import {
  getAllUsersController,
  getUserController,
  createUserController,
  updateUserController,
  deleteUserController,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/get-all-users", getAllUsersController);
router.get("/get-user/:id", getUserController);
router.post("/create-user", requireSignIn, isAdmin, createUserController);
router.patch("/update-user/:id", requireSignIn, isAdmin, updateUserController);
router.delete("/delete-user/:id", requireSignIn, isAdmin, deleteUserController);

export default router;
