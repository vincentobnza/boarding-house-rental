import ChatPanel from "./chat-panel";
import ChatSidebar from "./chat-sidebar";

export default function Chat() {
  return (
    <div className="w-full flex flex-1 min-h-auto">
      <ChatSidebar />
      <main className="flex-1">
        <ChatPanel />
      </main>
    </div>
  );
}
