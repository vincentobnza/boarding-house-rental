import { Search } from "lucide-react";

export default function Homepage() {
  return (
    <section className="w-full min-h-[75vh] flex">
      <div className="w-1/2 p-10 flex justify-center flex-col gap-4">
        <h1 className="text-6xl font-bold text-orange-400">Smart Search it?</h1>
        <p className="text-2xl mb-10">Find a suitable rental house</p>
        <div className="flex items-center border rounded-lg px-3 py-2 bg-white shadow-sm max-w-md">
          <span className="text-gray-400 mr-2">
            <Search size={20} />
          </span>
          <input
            type="text"
            placeholder="Search for a rental house..."
            className="outline-none flex-1 text-lg bg-transparent"
          />
        </div>
      </div>
      <div className="w-1/2 p-10"></div>
    </section>
  );
}
