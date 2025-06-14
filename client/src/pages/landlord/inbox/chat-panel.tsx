import { Button } from "@/components/ui/button";
import { SendHorizontal } from "lucide-react";

export default function ChatPanel() {
  return (
    <div className="flex flex-col h-full w-full p-6 bg-white">
      <h2 className="text-xl font-semibold mb-4">Chat Panel</h2>
      <div className="flex-1 overflow-y-auto ">
        <p className="text-gray-600">No messages yet. Start a conversation!</p>
      </div>
      <div className="mt-4 relative">
        <input
          type="text"
          placeholder="Type your message..."
          className="w-full p-3 border rounded pr-10"
        />
        <Button
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2"
        >
          <SendHorizontal />
        </Button>
      </div>
    </div>
  );
}
