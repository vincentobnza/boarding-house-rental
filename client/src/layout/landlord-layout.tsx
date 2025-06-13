import { Outlet } from "react-router-dom";
import Sidebar from "../pages/landlord/sidebar";

export default function LandlordLayout() {
  return (
    <div className="w-full flex min-h-screen">
      <Sidebar />
      <main className="flex-1 w-full max-w-screen-2xl mx-auto p-9 flex flex-col justify-center items-center">
        <Outlet />
      </main>
    </div>
  );
}
