import { Request, Response } from 'express';
import Apartment from '../models/apartment.models'; // Adjust path if needed
import { IApartment } from '../models/apartment.models';

// Create a new apartment
export const createApartment = async (req: Request, res: Response) => {
  try {
    // Check if main_picture uploaded
    if (!req.files || !("main_picture" in req.files)) {
      return res.status(400).json({ message: "Main picture is required" });
    }

    // Type assertion to access typed multer files
    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    const mainPicture = files["main_picture"][0].path;
    const additionalPics = files["additional_pictures"]
      ? files["additional_pictures"].map((file) => file.path)
      : [];

    // Create new apartment with file paths and other form data
    const newApartment = new Apartment({
      ...req.body,
      main_picture: mainPicture,
      additional_pictures: additionalPics,
    });

    const savedApartment = await newApartment.save();
    return res.status(201).json(savedApartment);
  } catch (error: unknown) {
  if (error instanceof Error) {
    return res.status(500).json({ message: error.message });
  }
  // Fallback if error is not an Error instance
  return res.status(500).json({ message: "An unknown error occurred" });
}
};

// Get all apartments
export const getApartments = async (req: Request, res: Response) => {
  try {
    const apartments = await Apartment.find();
    res.status(200).json(apartments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch apartments', details: error });
  }
};

// Get apartment by ID
export const getApartmentById = async (req: Request, res: Response) => {
  try {
    const apartment = await Apartment.findById(req.params.id);
    if (!apartment) {
      return res.status(404).json({ error: 'Apartment not found' });
    }
    res.status(200).json(apartment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch apartment', details: error });
  }
};

// Update apartment by ID
export const updateApartment = async (req: Request, res: Response) => {
  try {
    const updatedApartment = await Apartment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedApartment) {
      return res.status(404).json({ error: 'Apartment not found' });
    }
    res.status(200).json(updatedApartment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update apartment', details: error });
  }
};

// Delete apartment by ID
export const deleteApartment = async (req: Request, res: Response) => {
  try {
    const deletedApartment = await Apartment.findByIdAndDelete(req.params.id);
    if (!deletedApartment) {
      return res.status(404).json({ error: 'Apartment not found' });
    }
    res.status(200).json({ message: 'Apartment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete apartment', details: error });
  }
};
