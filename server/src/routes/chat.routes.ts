import { Router, Request, Response, NextFunction } from "express";
import {
  getConversations,
  getMessages,
  createMessage,
  createConversation,
} from "../controllers/chat.controller";

const router = Router();

// Helper to wrap async route handlers
const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

// Get all conversations for a user
router.get("/conversations/:userId", asyncHandler(getConversations));

// Get messages for a specific conversation
router.get("/messages/:conversationId", asyncHandler(getMessages));

// Create a new message
router.post("/messages", asyncHandler(createMessage));

// Create a new conversation
router.post("/conversations", asyncHandler(createConversation));

export default router;
