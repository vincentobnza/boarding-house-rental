import { Request, Response } from "express";
import Message from "../models/message.model";
import Conversation from "../models/conversation.model";
import mongoose from "mongoose";

export const getConversations = async (req: Request, res: Response) => {
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
      } else if (userId.includes("landlord")) {
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
            message:
              "I'm interested in the property, can I schedule a viewing?",
            timestamp: new Date(Date.now() - 3600000).toISOString(),
            sender: "tenant1",
          },
          updatedAt: new Date(Date.now() - 3600000).toISOString(),
        });
      }

      return res.status(200).json(mockConversations);
    }

    // If it's a valid MongoDB ObjectId, find conversations in the database
    const conversations = await Conversation.find({
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
  } catch (error) {
    console.error("Error getting conversations:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    const conversationId = req.params.conversationId;

    // Check if conversationId is a valid MongoDB ObjectId
    if (
      !mongoose.Types.ObjectId.isValid(conversationId) &&
      conversationId.includes("-")
    ) {
      // For demo/testing purposes, return mock messages when using custom chat room IDs
      // In production, you would handle this differently
      const mockMessages = [
        {
          _id: "mock1",
          conversationId: conversationId,
          sender: {
            _id: conversationId.split("-")[0],
            username:
              conversationId.split("-")[0] === "tenant1"
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
            username:
              conversationId.split("-")[1] === "landlord1"
                ? "Landlord User"
                : "Tenant User",
            avatar: "/avatar.png",
          },
          message:
            "Thanks for your interest! When would you like to schedule a viewing?",
          timestamp: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
        },
      ];

      return res.status(200).json(mockMessages);
    }

    // If it's a valid ObjectId, try to find it in the database
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    // Get messages for the conversation
    const messages = await Message.find({ conversationId })
      .populate({
        path: "sender",
        select: "username avatar",
      })
      .sort({ timestamp: 1 });

    return res.status(200).json(messages);
  } catch (error) {
    console.error("Error getting messages:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const createMessage = async (req: Request, res: Response) => {
  try {
    const { conversationId, sender, message } = req.body;

    // Validate inputs
    if (!conversationId || !sender || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Handle non-MongoDB ObjectId format for demo/testing
    if (
      !mongoose.Types.ObjectId.isValid(conversationId) &&
      conversationId.includes("-")
    ) {
      // For demo purposes, create a mock message response
      const mockMessage = {
        _id: new mongoose.Types.ObjectId().toString(),
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
    const newMessage = new Message({
      conversationId,
      sender,
      message,
    });

    await newMessage.save();

    // Update the last message in the conversation
    await Conversation.findByIdAndUpdate(conversationId, {
      lastMessage: newMessage._id,
    });

    // Populate the sender information
    await newMessage.populate({
      path: "sender",
      select: "username avatar",
    });

    return res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error creating message:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const createConversation = async (req: Request, res: Response) => {
  try {
    const { participants } = req.body;

    // Check if a conversation already exists between these participants
    const existingConversation = await Conversation.findOne({
      participants: { $all: participants, $size: participants.length },
    });

    if (existingConversation) {
      return res.status(200).json(existingConversation);
    }

    // Create a new conversation
    const newConversation = new Conversation({
      participants,
    });

    await newConversation.save();

    // Populate the participants information
    await newConversation.populate({
      path: "participants",
      select: "username avatar",
    });

    return res.status(201).json(newConversation);
  } catch (error) {
    console.error("Error creating conversation:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
