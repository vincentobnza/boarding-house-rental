"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSampleLandlordData = exports.getSampleTenantData = exports.createConversation = exports.createMessage = exports.getMessages = exports.getConversations = void 0;
const message_model_1 = __importDefault(require("../models/message.model"));
const conversation_model_1 = __importDefault(require("../models/conversation.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const getConversations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        // Check if userId contains a role indicator (for demo purposes)
        if (userId.includes("tenant") || userId.includes("landlord")) {
            // For demo/testing purposes, return mock conversations
            const mockConversations = [];
            if (userId.includes("tenant")) {
                mockConversations.push({
                    _id: "tenant1-landlord1",
                    participants: [
                        {
                            _id: "landlord1",
                            username: "John Owner",
                            avatar: "/avatar-landlord.png",
                        },
                        {
                            _id: "tenant1",
                            username: "Tenant User",
                            avatar: "/avatar-tenant.png",
                        },
                    ],
                    lastMessage: {
                        message: "When would you like to schedule a viewing?",
                        timestamp: new Date(Date.now() - 3600000).toISOString(),
                        sender: "landlord1",
                    },
                    property: "Sunny Heights Apartment",
                    updatedAt: new Date(Date.now() - 3600000).toISOString(),
                });
                mockConversations.push({
                    _id: "tenant1-landlord2",
                    participants: [
                        {
                            _id: "landlord2",
                            username: "Mary Property",
                            avatar: "/avatar-landlord2.png",
                        },
                        {
                            _id: "tenant1",
                            username: "Tenant User",
                            avatar: "/avatar-tenant.png",
                        },
                    ],
                    lastMessage: {
                        message: "The apartment is available starting next month.",
                        timestamp: new Date(Date.now() - 86400000).toISOString(),
                        sender: "landlord2",
                    },
                    property: "Downtown Studio",
                    updatedAt: new Date(Date.now() - 86400000).toISOString(),
                });
            }
            else if (userId.includes("landlord")) {
                // Add mock conversations for landlord
                mockConversations.push({
                    _id: "tenant1-landlord1",
                    participants: [
                        {
                            _id: "landlord1",
                            username: "Landlord User",
                            avatar: "/avatar-landlord.png",
                        },
                        {
                            _id: "tenant1",
                            username: "John Doe",
                            avatar: "/avatar-tenant.png",
                        },
                    ],
                    lastMessage: {
                        message: "I'm interested in the property, can I schedule a viewing?",
                        timestamp: new Date(Date.now() - 3600000).toISOString(),
                        sender: "tenant1",
                    },
                    updatedAt: new Date(Date.now() - 3600000).toISOString(),
                });
            }
            return res.status(200).json(mockConversations);
        }
        // If it's a valid MongoDB ObjectId, find conversations in the database
        const conversations = yield conversation_model_1.default.find({
            participants: userId,
        })
            .populate({
            path: "participants",
            select: "username avatar",
        })
            .populate({
            path: "lastMessage",
            select: "message timestamp sender",
        })
            .sort({ updatedAt: -1 });
        return res.status(200).json(conversations);
    }
    catch (error) {
        console.error("Error getting conversations:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.getConversations = getConversations;
const getMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conversationId = req.params.conversationId;
        // Check if conversationId is a valid MongoDB ObjectId
        if (!mongoose_1.default.Types.ObjectId.isValid(conversationId) &&
            conversationId.includes("-")) {
            // For demo/testing purposes, return mock messages when using custom chat room IDs
            // In production, you would handle this differently
            const mockMessages = [
                {
                    _id: "mock1",
                    conversationId: conversationId,
                    sender: {
                        _id: conversationId.split("-")[0],
                        username: conversationId.split("-")[0] === "tenant1"
                            ? "Tenant User"
                            : "Landlord User",
                        avatar: "/avatar.png",
                    },
                    message: "Hello! I'm interested in your property.",
                    timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
                },
                {
                    _id: "mock2",
                    conversationId: conversationId,
                    sender: {
                        _id: conversationId.split("-")[1],
                        username: conversationId.split("-")[1] === "landlord1"
                            ? "Landlord User"
                            : "Tenant User",
                        avatar: "/avatar.png",
                    },
                    message: "Thanks for your interest! When would you like to schedule a viewing?",
                    timestamp: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
                },
            ];
            return res.status(200).json(mockMessages);
        }
        // If it's a valid ObjectId, try to find it in the database
        const conversation = yield conversation_model_1.default.findById(conversationId);
        if (!conversation) {
            return res.status(404).json({ error: "Conversation not found" });
        }
        // Get messages for the conversation
        const messages = yield message_model_1.default.find({ conversationId })
            .populate({
            path: "sender",
            select: "username avatar",
        })
            .sort({ timestamp: 1 });
        return res.status(200).json(messages);
    }
    catch (error) {
        console.error("Error getting messages:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.getMessages = getMessages;
const createMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { conversationId, sender, message } = req.body;
        // Validate inputs
        if (!conversationId || !sender || !message) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        // Handle non-MongoDB ObjectId format for demo/testing
        if (!mongoose_1.default.Types.ObjectId.isValid(conversationId) &&
            conversationId.includes("-")) {
            // For demo purposes, create a mock message response
            const mockMessage = {
                _id: new mongoose_1.default.Types.ObjectId().toString(),
                conversationId,
                sender: {
                    _id: sender,
                    username: sender.includes("tenant") ? "Tenant User" : "Landlord User",
                    avatar: "/avatar.png",
                },
                message,
                timestamp: new Date().toISOString(),
            };
            // Emit this via Socket.IO
            // This part is handled in index.ts
            return res.status(201).json(mockMessage);
        }
        // If we're working with valid MongoDB ObjectIds, proceed normally
        // Create a new message
        const newMessage = new message_model_1.default({
            conversationId,
            sender,
            message,
        });
        yield newMessage.save();
        // Update the last message in the conversation
        yield conversation_model_1.default.findByIdAndUpdate(conversationId, {
            lastMessage: newMessage._id,
        });
        // Populate the sender information
        yield newMessage.populate({
            path: "sender",
            select: "username avatar",
        });
        return res.status(201).json(newMessage);
    }
    catch (error) {
        console.error("Error creating message:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.createMessage = createMessage;
const createConversation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { participants } = req.body;
        // Check if a conversation already exists between these participants
        const existingConversation = yield conversation_model_1.default.findOne({
            participants: { $all: participants, $size: participants.length },
        });
        if (existingConversation) {
            return res.status(200).json(existingConversation);
        }
        // Create a new conversation
        const newConversation = new conversation_model_1.default({
            participants,
        });
        yield newConversation.save();
        // Populate the participants information
        yield newConversation.populate({
            path: "participants",
            select: "username avatar",
        });
        return res.status(201).json(newConversation);
    }
    catch (error) {
        console.error("Error creating conversation:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.createConversation = createConversation;
// Mock data generation helpers
const generateMockTimestamp = (minutesAgo) => {
    return new Date(Date.now() - minutesAgo * 60000).toISOString();
};
// Sample API endpoints for Postman testing
const getSampleTenantData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Use the provided tenantId or default to "tenant1" if none is provided
        const tenantId = req.params.tenantId || "tenant1";
        // Sample tenant conversations
        const conversations = [
            {
                _id: `${tenantId}-landlord1`,
                participants: [
                    {
                        _id: "landlord1",
                        username: "John Owner",
                        avatar: "https://ui-avatars.com/api/?name=John+Owner&background=0D8ABC&color=fff",
                        role: "landlord",
                    },
                    {
                        _id: tenantId,
                        username: "Alex Renter",
                        avatar: "https://ui-avatars.com/api/?name=Alex+Renter&background=27AE60&color=fff",
                        role: "tenant",
                    },
                ],
                lastMessage: {
                    message: "When would you like to schedule a viewing?",
                    timestamp: generateMockTimestamp(60), // 1 hour ago
                    sender: "landlord1",
                },
                property: {
                    _id: "prop1",
                    name: "Sunny Heights Apartment",
                    address: "123 Main St, Anytown",
                    rent: "₱15,000/month",
                },
                unreadCount: 2,
                updatedAt: generateMockTimestamp(60),
            },
            {
                _id: `${tenantId}-landlord2`,
                participants: [
                    {
                        _id: "landlord2",
                        username: "Mary Property",
                        avatar: "https://ui-avatars.com/api/?name=Mary+Property&background=8E44AD&color=fff",
                        role: "landlord",
                    },
                    {
                        _id: tenantId,
                        username: "Alex Renter",
                        avatar: "https://ui-avatars.com/api/?name=Alex+Renter&background=27AE60&color=fff",
                        role: "tenant",
                    },
                ],
                lastMessage: {
                    message: "The apartment is available starting next month.",
                    timestamp: generateMockTimestamp(1440), // 1 day ago
                    sender: "landlord2",
                },
                property: {
                    _id: "prop2",
                    name: "Downtown Studio",
                    address: "456 Center Ave, Metropolis",
                    rent: "₱12,000/month",
                },
                unreadCount: 0,
                updatedAt: generateMockTimestamp(1440),
            },
        ];
        // Selected conversation messages
        const selectedConversation = req.query.conversationId || `${tenantId}-landlord1`;
        const messages = [
            {
                _id: "msg1",
                conversationId: selectedConversation,
                sender: {
                    _id: tenantId,
                    username: "Alex Renter",
                    avatar: "https://ui-avatars.com/api/?name=Alex+Renter&background=27AE60&color=fff",
                },
                message: "Hello! I'm interested in your Sunny Heights Apartment listing.",
                timestamp: generateMockTimestamp(120), // 2 hours ago
            },
            {
                _id: "msg2",
                conversationId: selectedConversation,
                sender: {
                    _id: "landlord1",
                    username: "John Owner",
                    avatar: "https://ui-avatars.com/api/?name=John+Owner&background=0D8ABC&color=fff",
                },
                message: "Hi Alex! Thanks for your interest. The apartment is still available.",
                timestamp: generateMockTimestamp(110), // 1 hour 50 mins ago
            },
            {
                _id: "msg3",
                conversationId: selectedConversation,
                sender: {
                    _id: tenantId,
                    username: "Alex Renter",
                    avatar: "https://ui-avatars.com/api/?name=Alex+Renter&background=27AE60&color=fff",
                },
                message: "Great! I'd like to see it. Is it possible to schedule a viewing?",
                timestamp: generateMockTimestamp(100), // 1 hour 40 mins ago
            },
            {
                _id: "msg4",
                conversationId: selectedConversation,
                sender: {
                    _id: "landlord1",
                    username: "John Owner",
                    avatar: "https://ui-avatars.com/api/?name=John+Owner&background=0D8ABC&color=fff",
                },
                message: "Certainly! I'm available tomorrow afternoon or Saturday morning. When would you like to schedule a viewing?",
                timestamp: generateMockTimestamp(60), // 1 hour ago
            },
        ];
        return res.status(200).json({
            conversations,
            messages,
            user: {
                _id: tenantId,
                username: "Alex Renter",
                role: "tenant",
                avatar: "https://ui-avatars.com/api/?name=Alex+Renter&background=27AE60&color=fff",
            },
        });
    }
    catch (error) {
        console.error("Error generating sample tenant data:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.getSampleTenantData = getSampleTenantData;
const getSampleLandlordData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Use the provided landlordId or default to "landlord1" if none is provided
        const landlordId = req.params.landlordId || "landlord1";
        // Sample landlord conversations
        const conversations = [
            {
                _id: `tenant1-${landlordId}`,
                participants: [
                    {
                        _id: landlordId,
                        username: "John Owner",
                        avatar: "https://ui-avatars.com/api/?name=John+Owner&background=0D8ABC&color=fff",
                        role: "landlord",
                    },
                    {
                        _id: "tenant1",
                        username: "Alex Renter",
                        avatar: "https://ui-avatars.com/api/?name=Alex+Renter&background=27AE60&color=fff",
                        role: "tenant",
                    },
                ],
                lastMessage: {
                    message: "Great! I'd like to see it. Is it possible to schedule a viewing?",
                    timestamp: generateMockTimestamp(100), // 1 hour 40 mins ago
                    sender: "tenant1",
                },
                property: {
                    _id: "prop1",
                    name: "Sunny Heights Apartment",
                    address: "123 Main St, Anytown",
                    rent: "₱15,000/month",
                },
                unreadCount: 1,
                updatedAt: generateMockTimestamp(100),
            },
            {
                _id: `tenant2-${landlordId}`,
                participants: [
                    {
                        _id: landlordId,
                        username: "John Owner",
                        avatar: "https://ui-avatars.com/api/?name=John+Owner&background=0D8ABC&color=fff",
                        role: "landlord",
                    },
                    {
                        _id: "tenant2",
                        username: "Sarah Client",
                        avatar: "https://ui-avatars.com/api/?name=Sarah+Client&background=F39C12&color=fff",
                        role: "tenant",
                    },
                ],
                lastMessage: {
                    message: "Is the property pet-friendly?",
                    timestamp: generateMockTimestamp(30), // 30 mins ago
                    sender: "tenant2",
                },
                property: {
                    _id: "prop1",
                    name: "Sunny Heights Apartment",
                    address: "123 Main St, Anytown",
                    rent: "₱15,000/month",
                },
                unreadCount: 3,
                updatedAt: generateMockTimestamp(30),
            },
        ];
        // Selected conversation messages
        const selectedConversation = req.query.conversationId || `tenant1-${landlordId}`;
        const messages = [
            {
                _id: "msg1",
                conversationId: selectedConversation,
                sender: {
                    _id: "tenant1",
                    username: "Alex Renter",
                    avatar: "https://ui-avatars.com/api/?name=Alex+Renter&background=27AE60&color=fff",
                },
                message: "Hello! I'm interested in your Sunny Heights Apartment listing.",
                timestamp: generateMockTimestamp(120), // 2 hours ago
            },
            {
                _id: "msg2",
                conversationId: selectedConversation,
                sender: {
                    _id: landlordId,
                    username: "John Owner",
                    avatar: "https://ui-avatars.com/api/?name=John+Owner&background=0D8ABC&color=fff",
                },
                message: "Hi Alex! Thanks for your interest. The apartment is still available.",
                timestamp: generateMockTimestamp(110), // 1 hour 50 mins ago
            },
            {
                _id: "msg3",
                conversationId: selectedConversation,
                sender: {
                    _id: "tenant1",
                    username: "Alex Renter",
                    avatar: "https://ui-avatars.com/api/?name=Alex+Renter&background=27AE60&color=fff",
                },
                message: "Great! I'd like to see it. Is it possible to schedule a viewing?",
                timestamp: generateMockTimestamp(100), // 1 hour 40 mins ago
            },
        ];
        return res.status(200).json({
            conversations,
            messages,
            user: {
                _id: landlordId,
                username: "John Owner",
                role: "landlord",
                avatar: "https://ui-avatars.com/api/?name=John+Owner&background=0D8ABC&color=fff",
                properties: [
                    {
                        _id: "prop1",
                        name: "Sunny Heights Apartment",
                        address: "123 Main St, Anytown",
                        rent: "₱15,000/month",
                        status: "active",
                    },
                    {
                        _id: "prop2",
                        name: "City View Condo",
                        address: "789 Urban Blvd, Metropolis",
                        rent: "₱20,000/month",
                        status: "active",
                    },
                ],
            },
        });
    }
    catch (error) {
        console.error("Error generating sample landlord data:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
exports.getSampleLandlordData = getSampleLandlordData;
