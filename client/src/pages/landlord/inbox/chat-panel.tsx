import { Button } from "@/components/ui/button";
import { SendHorizontal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useChat } from "@/hooks/useChat";
import { useAuth } from "@/hooks/useAuth";

export default function ChatPanel({ roomId }: { roomId: string }) {
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const { user } = useAuth();
  const {
    messages,
    sendMessage,
    joinRoom,
    typingUsers,
    startTyping,
    stopTyping,
  } = useChat();

  // Join the room when the component mounts or roomId changes
  useEffect(() => {
    if (roomId) {
      joinRoom(roomId);
    }
  }, [roomId, joinRoom]);

  // Scroll to the bottom of the messages container
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && roomId) {
      sendMessage(roomId, newMessage);
      setNewMessage("");
      stopTyping();
    }
  };

  const handleTyping = () => {
    startTyping();
  };

  const handleStopTyping = () => {
    stopTyping();
  };

  return (
    <div className="flex h-full w-full flex-col bg-white p-6">
      <h2 className="mb-4 text-xl font-semibold">Chat Panel</h2>
      <div className="mb-4 flex-1 overflow-y-auto rounded-lg border bg-gray-50 p-4">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-gray-500">
              No messages yet. Start a conversation!
            </p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-4 flex ${
                msg.sender.username === user?.username
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs rounded-lg p-3 ${
                  msg.sender.username === user?.username
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                <p className="text-sm font-semibold">{msg.sender.username}</p>
                <p className="text-md">{msg.message}</p>
                <p
                  className={`mt-1 text-right text-xs ${
                    msg.sender.username === user?.username
                      ? "text-blue-200"
                      : "text-gray-500"
                  }`}
                >
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
        {typingUsers.length > 0 && (
          <div className="text-sm text-gray-500 italic">
            {typingUsers.join(", ")} {typingUsers.length > 1 ? "are" : "is"}{" "}
            typing...
          </div>
        )}
      </div>
      <form onSubmit={handleSendMessage} className="relative">
        <input
          type="text"
          placeholder="Type your message..."
          className="w-full rounded-full border p-3 pr-12 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={newMessage}
          onChange={(e) => {
            setNewMessage(e.target.value);
            handleTyping();
          }}
          onBlur={handleStopTyping}
        />
        <Button
          type="submit"
          size="icon"
          className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-blue-600 hover:bg-blue-700"
        >
          <SendHorizontal className="text-white" />
        </Button>
      </form>
    </div>
  );
}
