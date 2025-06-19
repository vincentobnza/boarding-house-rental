import { createContext } from "react";
import { Socket } from "socket.io-client";

export interface Message {
  _id: string;
  conversationId: string;
  sender: {
    _id: string;
    username: string;
    avatar?: string;
  };
  message: string;
  timestamp: string;
}

export interface Conversation {
  _id: string;
  participants: {
    id: string;
    username: string;
    avatar?: string;
  }[];
  lastMessage?: {
    message: string;
    timestamp: string;
    sender: string;
  };
  updatedAt: string;
}

export interface ChatContextType {
  socket: Socket | null;
  messages: Message[];
  conversations: Conversation[];
  loading: boolean;
  sendMessage: (roomId: string, message: string) => void;
  joinRoom: (roomId: string) => void;
  currentRoom: string | null;
  typingUsers: string[];
  startTyping: () => void;
  stopTyping: () => void;
}

export const ChatContext = createContext<ChatContextType | undefined>(
  undefined,
);
