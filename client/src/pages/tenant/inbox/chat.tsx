import { useState } from "react";
import { useChat } from "@/hooks/useChat";
import ChatPanel from "../../landlord/inbox/chat-panel";
import ChatSidebar from "./chat-sidebar";

export default function TenantChat() {
  const { joinRoom } = useChat();
  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >(null);

  const handleConversationSelect = (conversationId: string) => {
    setSelectedConversation(conversationId);
    joinRoom(conversationId);
  };

  return (
    <div className="flex h-[calc(100vh-80px)]">
      <ChatSidebar
        onSelectConversation={handleConversationSelect}
        selectedConversation={selectedConversation}
      />
      <div className="flex-1">
        {selectedConversation ? (
          <ChatPanel roomId={selectedConversation} />
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-gray-500">
              Select a conversation to start chatting.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
