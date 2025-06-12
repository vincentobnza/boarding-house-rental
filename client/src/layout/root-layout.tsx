import Navbar from "@/components/navbar";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-zinc-100">
        <Outlet />
      </main>
      <footer className="bg-gray-800 text-white text-center py-4">
        <p className="text-sm">© 2023 Smart Search. All rights reserved.</p>
      </footer>
    </div>
  );
}
