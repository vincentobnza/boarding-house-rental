import { Request, Response } from "express";
import Message from "../models/message.model";
import Conversation from "../models/conversation.model";
import mongoose from "mongoose";

export const getConversations = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    // Find conversations where the user is a participant
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

    // Validate if the conversation exists
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
