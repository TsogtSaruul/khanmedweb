import express from "express";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import {
  getAllDepartmentsController,
  getDepartmentController,
  createDepartmentController,
  updateDepartmentController,
  deleteDepartmentController,
} from "../controllers/departmentController.js";

const router = express.Router();

router.get("/get-all-departments", getAllDepartmentsController);
router.get("/get-department/:id", getDepartmentController);
router.post("/create-department", requireSignIn, isAdmin, createDepartmentController);
router.patch("/update-department/:id", requireSignIn, isAdmin, updateDepartmentController);
router.delete("/delete-department/:id", requireSignIn, isAdmin, deleteDepartmentController);

export default router;
