import Navbar from "@/pages/landlord/navbar";
import { Outlet } from "react-router-dom";

export default function LandlordLayout() {
  return (
    <div className="w-full flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 w-full max-w-screen-2xl mx-auto p-9 flex flex-col justify-center items-center">
        <Outlet />
      </main>
    </div>
  );
}
