import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="bg-zinc-800 min-h-screen">
      <Outlet />
    </div>
  );
}
