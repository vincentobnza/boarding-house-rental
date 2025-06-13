import ChatPanel from "./chat-panel";
import ChatSidebar from "./chat-sidebar";

export default function Chat() {
  return (
    <div className="w-full flex min-h-[70vh]">
      <ChatSidebar />
      <main className="flex-1">
        <ChatPanel />
      </main>
    </div>
  );
}
