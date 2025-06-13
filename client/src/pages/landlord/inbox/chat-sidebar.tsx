import { Ellipsis } from "lucide-react";

export default function ChatSidebar() {
  return (
    <aside className="flex flex-col w-90 border-r border-zinc-200 p-4">
      <h2 className="text-lg font-semibold mb-4 ml-3">Inbox</h2>
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
