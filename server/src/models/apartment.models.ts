import mongoose, { Schema, Document } from "mongoose";





export interface IApartment extends Document {
  apartment_name: string;
  apartment_type: string;
  address_1: string;
  address_2: string;
  long_lat: string;
  main_picture: string;
  monthly_rent: number;
  deposit_amount: number;
  additional_pictures: string[];
  status: "Available" | "Occupied" | "Under Maintenance";
  createdAt: Date;
}

const ApartmentSchema = new Schema<IApartment>({
  apartment_name: { type: String, required: true, trim: true },
  apartment_type: { type: String, required: true, trim: true },
  address_1: { type: String, required: true },
  address_2: { type: String, required: true },
  long_lat: { type: String, required: true },
  main_picture: { type: String, required: true, trim: true },
  
  deposit_amount: { type: Number, required: true },
    monthly_rent: { type: Number, required: true },
  additional_pictures: [{ type: String, required: true }],
    status: {
        type: String,
        enum: ["Available", "Occupied", "Under Maintenance"],
        default: "Available",
    },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IApartment>(
  "Apartment",
  ApartmentSchema
);
