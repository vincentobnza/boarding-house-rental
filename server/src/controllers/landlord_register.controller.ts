import { Request, Response } from "express";
import LandlordRegistration from "../models/landlord_register.models";
import { RegistrationPayment } from "../models/landlord_register.models";

// Create landlord registration handler
export const createLandlord = async (req: Request, res: Response): Promise<void> => {
  const files = (req as Request & { files?: { [fieldname: string]: Express.Multer.File[] } }).files;

  console.log("=== createLandlord called ===");
  console.log("Files received:", Object.keys(files || {}));
  console.log("Request body:", req.body);

  try {
    if (!files) {
      res.status(400).json({ error: "Files are required" });
      return;
    }

    const blpo_certificate = files["blpo_certificate"]?.[0]?.path;
    const bfp_certificate = files["bfp_certificate"]?.[0]?.path;
    const meo_clearance = files["meo_clearance"]?.[0]?.path;
    const property_photos = files["property_photos"]?.map((file) => file.path) || [];

    if (!blpo_certificate || !bfp_certificate || !meo_clearance || property_photos.length === 0) {
      res.status(400).json({ error: "All required files must be uploaded" });
      return;
    }

    const monthlyRate = Number(req.body.monthly_rate);
    if (isNaN(monthlyRate)) {
      res.status(400).json({ error: "monthly_rate must be a valid number" });
      return;
    }

    const paymentId = req.body.payment;
    if (paymentId && typeof paymentId !== "string") {
      res.status(400).json({ error: "payment must be a string representing ObjectId" });
      return;
    }

    console.log("File paths:", { blpo_certificate, bfp_certificate, meo_clearance, property_photos });
    console.log("Payment ID:", paymentId);

    const landlord = new LandlordRegistration({
      business_name: req.body.business_name,
      business_address: req.body.business_address,
      blpo_certificate,
      bfp_certificate,
      meo_clearance,
      property_name: req.body.property_name,
      property_address: req.body.property_address,
      property_description: req.body.property_description,
      monthly_rate: monthlyRate,
      property_photos,
      payment: paymentId || null,
    });

    await landlord.save();
    console.log("Landlord registration saved successfully");

    res.status(201).json(landlord);
  } catch (error) {
    console.error("Error creating landlord:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Create payment handler
export const createPayment = async (req: Request, res: Response): Promise<void> => {
  const file = (req as Request & { file?: Express.Multer.File }).file;

  console.log("=== createPayment called ===");
  console.log("Request body:", req.body);
  console.log("File received:", file?.path);

  try {
    if (!file) {
      res.status(400).json({ error: "Proof of payment image is required" });
      return;
    }

    if (!req.body.full_name || !req.body.reference_number) {
      res.status(400).json({ error: "Full name and reference number are required" });
      return;
    }

    const payment = new RegistrationPayment({
      full_name: req.body.full_name,
      proof_of_payment: file.path,
      reference_number: req.body.reference_number,
    });

    await payment.save();
    console.log("Payment saved successfully");

    res.status(201).json(payment);
  } catch (error) {
    console.error("Error creating payment:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all landlord registrations
export const getAllLandlords = async (req: Request, res: Response): Promise<void> => {
  try {
    const landlords = await LandlordRegistration.find().populate("payment");
    res.status(200).json(landlords);
  } catch (error) {
    console.error("Error getting landlords:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Update landlord registration status (accept or decline)
export const updateLandlordStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["accept", "decline"].includes(status)) {
      res.status(400).json({ error: "Status must be either 'accept' or 'decline'" });
      return;
    }

    const landlord = await LandlordRegistration.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!landlord) {
      res.status(404).json({ error: "Landlord registration not found" });
      return;
    }

    res.status(200).json({ message: `Status updated to '${status}'`, landlord });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ error: "Server error" });
  }
};
