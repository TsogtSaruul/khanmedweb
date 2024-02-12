import express from "express";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import {
  getAllSchedulesController,
  getScheduleController,
  createScheduleController,
  updateScheduleController,
  deleteScheduleController,
} from "../controllers/scheduleController.js";

const router = express.Router();

router.get("/get-all-schedules", getAllSchedulesController);
router.get("/get-schedule/:id", getScheduleController);
router.post("/create-schedule", requireSignIn, isAdmin, createScheduleController);
router.patch("/update-schedule/:id", requireSignIn, isAdmin, updateScheduleController);
router.delete("/delete-schedule/:id", requireSignIn, isAdmin, deleteScheduleController);

export default router;
