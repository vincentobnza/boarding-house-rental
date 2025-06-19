import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import io, { Socket } from "socket.io-client";
import { useAuth } from "./useAuth";

interface Message {
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

interface Conversation {
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

interface ChatContextType {
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

export function ChatProvider({ children }: { children: ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentRoom, setCurrentRoom] = useState<string | null>(null);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);

    // Fetch conversations
    if (user?.id) {
      fetchConversations(user.id);
    }

    // Clean up on unmount
    return () => {
      if (newSocket) newSocket.disconnect();
    };
  }, [user]);

  useEffect(() => {
    if (!socket) return;

    // Listen for incoming messages
    socket.on("chatMessage", (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    // Listen for typing events
    socket.on("typing", ({ sender }: { sender: string }) => {
      setTypingUsers((prev) =>
        prev.includes(sender) ? prev : [...prev, sender],
      );
    });

    socket.on("stopTyping", ({ sender }: { sender: string }) => {
      setTypingUsers((prev) => prev.filter((username) => username !== sender));
    });

    return () => {
      socket.off("chatMessage");
      socket.off("typing");
      socket.off("stopTyping");
    };
  }, [socket]);

  const fetchConversations = async (userId: string) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/chat/conversations/${userId}`,
      );
      const data = await response.json();
      setConversations(data);
    } catch (error) {
      console.error("Error fetching conversations:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (conversationId: string) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/chat/messages/${conversationId}`,
      );
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const joinRoom = (roomId: string) => {
    if (!socket || !roomId) return;

    // Leave current room if any
    if (currentRoom) {
      socket.emit("leaveRoom", currentRoom);
    }

    // Join new room
    socket.emit("joinRoom", roomId);
    setCurrentRoom(roomId);

    // Fetch messages for this room
    fetchMessages(roomId);
  };
  const sendMessage = (roomId: string, message: string) => {
    if (!socket || !user || !roomId || message.trim() === "") return;

    const messageData = {
      roomId,
      message,
      sender: user.id,
      timestamp: new Date().toISOString(),
    };

    socket.emit("chatMessage", messageData);

    // Optional: We could also send this via REST API to ensure persistence
    fetch("http://localhost:5000/api/chat/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        conversationId: roomId,
        sender: user.id,
        message,
      }),
    }).catch((error) => console.error("Error saving message:", error));
  };

  const startTyping = () => {
    if (!socket || !currentRoom || !user?.username) return;
    socket.emit("typing", { roomId: currentRoom, sender: user.username });
  };

  const stopTyping = () => {
    if (!socket || !currentRoom || !user?.username) return;
    socket.emit("stopTyping", { roomId: currentRoom, sender: user.username });
  };

  return (
    <ChatContext.Provider
      value={{
        socket,
        messages,
        conversations,
        loading,
        sendMessage,
        joinRoom,
        currentRoom,
        typingUsers,
        startTyping,
        stopTyping,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
