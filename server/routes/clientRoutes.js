import express from "express";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import {
  getAllClientsController,
  getClientController,
  createClientController,
  updateClientController,
  deleteClientController,
} from "../controllers/clientController.js";

const router = express.Router();

router.get("/get-all-clients", getAllClientsController);
router.get("/get-client/:id", getClientController);
router.post("/create-client", requireSignIn, isAdmin, createClientController);
router.patch("/update-client/:id", requireSignIn, isAdmin, updateClientController);
router.delete("/delete-client/:id", requireSignIn, isAdmin, deleteClientController);

export default router;
