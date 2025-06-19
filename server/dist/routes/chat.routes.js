"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chat_controller_1 = require("../controllers/chat.controller");
const router = (0, express_1.Router)();
// Helper to wrap async route handlers
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
// Get all conversations for a user
router.get("/conversations/:userId", asyncHandler(chat_controller_1.getConversations));
// Get messages for a specific conversation
router.get("/messages/:conversationId", asyncHandler(chat_controller_1.getMessages));
// Create a new message
router.post("/messages", asyncHandler(chat_controller_1.createMessage));
// Create a new conversation
router.post("/conversations", asyncHandler(chat_controller_1.createConversation));
// Sample data endpoints for Postman testing
router.get("/sample/tenant", asyncHandler(chat_controller_1.getSampleTenantData)); // Default route with no ID
router.get("/sample/tenant/:tenantId", asyncHandler(chat_controller_1.getSampleTenantData)); // Route with ID
router.get("/sample/landlord", asyncHandler(chat_controller_1.getSampleLandlordData)); // Default route with no ID
router.get("/sample/landlord/:landlordId", asyncHandler(chat_controller_1.getSampleLandlordData)); // Route with ID
exports.default = router;
