import express from "express";
import {
  appointmentCategoryController,
  appointmentCountController,
  appointmentFiltersController,
  appointmentListController,
  relatedAppointmentController,
  searchAppointmentController,
  
  getAllAppointmentsController,
  getSomeAppointmentsController,
  getAppointmentController,
  createAppointmentController,
  updateAppointmentController,
  deleteAppointmentController,
} from "../controllers/appointmentController.js";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";


const router = express.Router();

// Appointment count
router.get("/appointment-count", appointmentCountController);
// Appointment per page
router.get("/appointment-list/:page", appointmentListController);
// search Appointment
router.get("/search/:keyword", searchAppointmentController);
// similar Appointment
router.get("/related-appointment/:pid/:cid", relatedAppointmentController);
// category wise Appointment
router.get("/appointment-category/:slug", appointmentCategoryController);


router.get("/get-all-appointments", getAllAppointmentsController);
router.get("/get-some-appointments", getSomeAppointmentsController);
router.get("/get-appointment/:id", getAppointmentController);
router.post("/appointment-filters", appointmentFiltersController);
// router.post("/create-appointment", requireSignIn, isAdmin, createAppointmentController);
router.post("/create-appointment", requireSignIn, createAppointmentController);
router.patch("/update-appointment/:id", requireSignIn, isAdmin, updateAppointmentController);
router.delete("/delete-appointment/:id", requireSignIn, deleteAppointmentController);

export default router;
