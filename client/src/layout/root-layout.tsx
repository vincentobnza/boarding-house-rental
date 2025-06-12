import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-zinc-100">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
