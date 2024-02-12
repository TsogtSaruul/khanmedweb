import express from "express";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import {
  getAllServicesController,
  getServiceController,
  createServiceController,
  updateServiceController,
  deleteServiceController,
} from "../controllers/serviceController.js";

const router = express.Router();

router.get("/get-all-services", getAllServicesController);
router.get("/get-service/:id", getServiceController);
router.post("/create-service", requireSignIn, isAdmin, createServiceController);
router.patch("/update-service/:id", requireSignIn, isAdmin, updateServiceController);
router.delete("/delete-service/:id", requireSignIn, isAdmin, deleteServiceController);

export default router;
