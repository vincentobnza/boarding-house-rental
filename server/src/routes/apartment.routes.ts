import { Router, Request, Response, NextFunction } from 'express';
import {
  createApartment,
  getApartments,
  getApartmentById,
  updateApartment,
  deleteApartment,
} from '../controllers/apartment.controller';
import { upload } from '../middleware/uploads.middleware'; // Import the upload middleware
import { upload as multerUpload } from '../middleware/uploads.middleware'; // Import the multer upload middleware

const router = Router();

// Async error wrapper
const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

// Routes wrapped with asyncHandler
router.post(
  "/",
  upload.fields([
    { name: "main_picture", maxCount: 1 },
    { name: "additional_pictures", maxCount: 10 },
  ]),
  asyncHandler(createApartment)
);

router.get("/", asyncHandler(getApartments));
router.get("/:id", asyncHandler(getApartmentById));

// For update, do the same if you want to allow new uploads during update
router.put(
  "/:id",
  upload.fields([
    { name: "main_picture", maxCount: 1 },
    { name: "additional_pictures", maxCount: 10 },
  ]),
  asyncHandler(updateApartment)
);

router.delete("/:id", asyncHandler(deleteApartment));

export default router;