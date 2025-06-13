import { Router, Request, Response, NextFunction } from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/users.controller";
import { userMiddleware } from "../middleware/user.middleware";
import { requireRole } from "../middleware/role.middleware";
const router = Router();

router.use(userMiddleware);

// Helper to wrap async route handlers
const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

// Only admin can get all users
router.get(
  "/",
  requireRole(["admin"]),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    await getAllUsers(req, res, next);
  })
);
router.get(
  "/:id",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    await getUserById(req, res, next);
  })
);
router.post(
  "/",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    await createUser(req, res, next);
  })
);
// Only landlord and admin can update users
router.put(
  "/:id",
  requireRole(["landlord", "admin"]),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    await updateUser(req, res, next);
  })
);
// Only admin can delete users
router.delete(
  "/:id",
  requireRole(["admin"]),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    await deleteUser(req, res, next);
  })
);

export default router;
