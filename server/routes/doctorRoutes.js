import express from "express";
import { 
  getAllDoctorsController,
  getDoctorController,
  createDoctorController,
  updateDoctorController,
  deleteDoctorController,
} from "../controllers/doctorController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";


const router = express.Router();

router.get("/get-all-doctors", getAllDoctorsController);
router.get("/get-doctor/:id", getDoctorController);
router.post("/create-doctor", requireSignIn, isAdmin, createDoctorController);
router.patch("/update-doctor/:id", requireSignIn, isAdmin, updateDoctorController);
router.delete("/delete-doctor/:id", deleteDoctorController);

export default router;
