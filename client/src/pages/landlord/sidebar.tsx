export default function Sidebar() {
  return (
    <aside className="w-60 h-full fixed left-0 top-0 bg-white shadow-md flex flex-col p-6 gap-4">
      <nav className="flex flex-col gap-4">
        <a href="#" className="text-lg font-medium hover:text-blue-600">
          Listing
        </a>
        <a href="#" className="text-lg font-medium hover:text-blue-600">
          Inbox
        </a>
        <a href="#" className="text-lg font-medium hover:text-blue-600">
          Menu
        </a>
      </nav>
    </aside>
  );
}
