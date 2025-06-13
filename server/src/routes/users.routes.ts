import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/users.controller";
import { userMiddleware } from "../middleware/user.middleware";
const router = Router();

router.use(userMiddleware);

const asyncHandler = (fn: any) => (req: any, res: any, next: any) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

router.get("/", asyncHandler(getAllUsers));
router.get("/:id", asyncHandler(getUserById));
router.post("/", asyncHandler(createUser));
router.put("/:id", asyncHandler(updateUser));
router.delete("/:id", asyncHandler(deleteUser));

export default router;
