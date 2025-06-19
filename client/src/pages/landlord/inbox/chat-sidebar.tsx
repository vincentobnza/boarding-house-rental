import { Ellipsis, Search } from "lucide-react";

// Define a type for conversation participants
interface Participant {
  id: string;
  name: string;
  avatar: string; // URL to the avatar image
}

interface Conversation {
  id: string;
  participant: Participant;
  lastMessage: string;
  timestamp: string;
}

// Dummy data for conversations
const conversations: Conversation[] = [
  {
    id: "tenant1-landlord1",
    participant: {
      id: "tenant1",
      name: "John Doe",
      avatar: "/path/to/tenant1-avatar.png",
    },
    lastMessage: "See you then!",
    timestamp: "10:42 AM",
  },
  {
    id: "tenant2-landlord1",
    participant: {
      id: "tenant2",
      name: "Jane Smith",
      avatar: "/path/to/tenant2-avatar.png",
    },
    lastMessage: "I'll check and get back to you.",
    timestamp: "Yesterday",
  },
];

export default function ChatSidebar({
  onSelectConversation,
}: {
  onSelectConversation: (roomId: string) => void;
}) {
  return (
    <aside className="flex w-96 flex-col border-r border-zinc-200 bg-gray-50 p-4">
      <h2 className="mb-4 text-2xl font-bold text-gray-800">Inbox</h2>
      <div className="relative mb-4">
        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="size-5 text-zinc-400" />
        </span>
        <input
          type="text"
          placeholder="Search people..."
          className="w-full rounded-full border p-2 pr-4 pl-10 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>
      <ul className="space-y-2 overflow-y-auto">
        {conversations.map((convo) => (
          <li
            key={convo.id}
            className="flex cursor-pointer items-center justify-between rounded-lg p-3 transition-colors duration-200 hover:bg-zinc-100"
            onClick={() => onSelectConversation(convo.id)}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-lg font-bold text-white">
                {convo.participant.name.charAt(0)}
              </div>
              <div className="flex-1">
                <span className="text-md font-semibold text-gray-900">
                  {convo.participant.name}
                </span>
                <p className="truncate text-sm text-gray-600">
                  {convo.lastMessage}
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs text-gray-500">{convo.timestamp}</span>
              <Ellipsis className="mt-1 size-5 cursor-pointer text-zinc-500 hover:text-zinc-700" />
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
