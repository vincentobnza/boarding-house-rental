import { Search } from "lucide-react";

// Define types for conversation data
interface Participant {
  id: string;
  name: string;
  role: string;
}

interface TenantConversation {
  id: string;
  participant: Participant;
  property: string;
  lastMessage: string;
  timestamp: string;
}

// Dummy data for conversations
const demoConversations: TenantConversation[] = [
  {
    id: "landlord1-tenant1",
    participant: {
      id: "landlord1",
      name: "John Owner",
      role: "landlord",
    },
    property: "Sunny Heights Apartment",
    lastMessage: "When would you like to schedule a viewing?",
    timestamp: "10:30 AM",
  },
  {
    id: "landlord2-tenant1",
    participant: {
      id: "landlord2",
      name: "Mary Renter",
      role: "landlord",
    },
    property: "Downtown Studio",
    lastMessage: "The apartment is available starting next month.",
    timestamp: "Yesterday",
  },
];

export default function ChatSidebar({
  onSelectConversation,
  selectedConversation,
}: {
  onSelectConversation: (roomId: string) => void;
  selectedConversation: string | null;
}) {
  return (
    <aside className="flex w-96 flex-col border-r border-zinc-200 bg-gray-50 p-4">
      <h2 className="mb-4 text-2xl font-bold text-gray-800">Messages</h2>
      <div className="relative mb-4">
        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="size-5 text-zinc-400" />
        </span>
        <input
          type="text"
          placeholder="Search landlords..."
          className="w-full rounded-full border p-2 pr-4 pl-10 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
        />
      </div>
      <ul className="space-y-2">
        {demoConversations.map((convo) => (
          <li
            key={convo.id}
            className={`flex cursor-pointer items-center justify-between rounded-lg p-3 transition-colors duration-200 ${
              selectedConversation === convo.id
                ? "bg-orange-50"
                : "hover:bg-zinc-100"
            }`}
            onClick={() => onSelectConversation(convo.id)}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-lg font-bold text-white">
                {convo.participant.name.charAt(0)}
              </div>
              <div className="flex-1">
                <span className="text-md font-semibold text-gray-900">
                  {convo.participant.name}
                </span>
                <p className="overflow-hidden text-sm text-ellipsis text-gray-600">
                  {convo.lastMessage}
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs text-gray-500">{convo.timestamp}</span>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
