import { useState } from "react";
import ChatPanel from "./chat-panel";
import ChatSidebar from "./chat-sidebar";

export default function Chat() {
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(
    "tenant1-landlord1",
  );

  return (
    <div className="flex h-[calc(100vh-80px)]">
      <ChatSidebar onSelectConversation={setSelectedRoomId} />
      <div className="flex-1">
        {selectedRoomId ? (
          <ChatPanel roomId={selectedRoomId} />
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
