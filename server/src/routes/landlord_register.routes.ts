import express from "express";
import { upload } from "../middleware/uploads.middleware"; // Import the middleware
import {
  createLandlord,
  createPayment,
  getAllLandlords,
  updateLandlordStatus,
} from "../controllers/landlord_register.controller";

const router = express.Router();

// Single file upload for payment proof
router.post("/payment", upload.single("proof_of_payment"), createPayment);

// Multiple file upload for landlord registration
router.post(
  "/register",
  upload.fields([
    { name: "blpo_certificate", maxCount: 1 },
    { name: "bfp_certificate", maxCount: 1 },
    { name: "meo_clearance", maxCount: 1 },
    { name: "property_photos", maxCount: 10 },
  ]),
  createLandlord
);

// Get all landlord registrations
router.get("/landlords", getAllLandlords);

// Update landlord status
router.patch("/landlords/:id/status", updateLandlordStatus);

export default router;
