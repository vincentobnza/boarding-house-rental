import { Ellipsis } from "lucide-react";
import { Search } from "lucide-react";

export default function ChatSidebar() {
  return (
    <aside className="flex flex-col w-90 border-r border-zinc-200 p-4">
      <h2 className="text-lg font-semibold mb-2">Inbox</h2>
      <div className="relative mb-4">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="text-zinc-400 size-4" />
        </span>
        <input
          type="text"
          placeholder="Search people..."
          className="w-full p-2 border rounded pl-10 pr-2 text-sm"
        />
      </div>
      <ul className="space-y-2">
        {dummyPersons.map((person, index) => (
          <li
            key={index}
            className="flex justify-between items-center p-2 hover:bg-zinc-100 rounded cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: `hsl(${
                    (person.charCodeAt(0) * 137) % 360
                  }, 60%, 70%)`,
                }}
              >
                <span className="text-sm font-medium">{person.charAt(0)}</span>
              </div>
              <span className="text-sm font-medium">{person}</span>
            </div>
            <Ellipsis className="text-zinc-500 hover:text-zinc-700 cursor-pointer size-4" />
          </li>
        ))}
      </ul>
    </aside>
  );
}

const dummyPersons = [
  "John Doe",
  "Jane Smith",
  "Alice Johnson",
  "Bob Brown",
  "Charlie Davis",
  "Diana Prince",
];
