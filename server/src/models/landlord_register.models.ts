import mongoose, { Schema, Document } from "mongoose";

export interface IRegistrationPayment extends Document {
  full_name: string;
  proof_of_payment: string;
  reference_number: string;
  createdAt: Date;
}

const RegistrationPaymentSchema = new Schema<IRegistrationPayment>({
  full_name: { type: String, required: true, trim: true },
  proof_of_payment: { type: String, required: true },
  reference_number: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now },
});

export const RegistrationPayment = mongoose.model<IRegistrationPayment>(
  "RegistrationPayment",
  RegistrationPaymentSchema
);

export interface ILandlordRegistration extends Document {
  business_name: string;
  business_address: string;
  blpo_certificate: string;
  bfp_certificate: string;
  meo_clearance: string;
  property_name: string;
  property_address: string;
  property_description: string;
  monthly_rate: number;
  property_photos: string[];
  payment: Schema.Types.ObjectId;
  status: "pending" | "accept" | "decline";
  createdAt: Date;
}

const LandlordRegistrationSchema = new Schema<ILandlordRegistration>({
  business_name: { type: String, required: true, trim: true },
  business_address: { type: String, required: true, trim: true },
  blpo_certificate: { type: String, required: true },
  bfp_certificate: { type: String, required: true },
  meo_clearance: { type: String, required: true },
  property_name: { type: String, required: true, trim: true },
  property_address: { type: String, required: true, trim: true },
  property_description: { type: String, required: true, trim: true },
  monthly_rate: { type: Number, required: true },
  property_photos: [{ type: String, required: true }],
  payment: { type: Schema.Types.ObjectId, ref: "RegistrationPayment", required: true },
  status: { type: String, enum: ["pending", "accept", "decline"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<ILandlordRegistration>(
  "LandlordRegistration",
  LandlordRegistrationSchema
);
