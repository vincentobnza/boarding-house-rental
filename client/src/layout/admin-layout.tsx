import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Hourglass,
  BadgeCheck,
  FileWarning,
} from "lucide-react";
import Footer from "@/components/footer";
import { useState, useEffect } from "react";

export default function AdminLayout() {
  // Move pendingCount to state
  const [pendingCount, setPendingCount] = useState(5);
  const location = useLocation();

  // Hide badge when on Pending Listings page
  useEffect(() => {
    if (location.pathname === "/admin/dashboard/pending-list") {
      setPendingCount(0);
    }
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-zinc-200 flex flex-col">
        <div className="h-18 px-6 py-4 border-b border-zinc-200 flex items-center justify-between">
          <h1 className="text-xl font-bold">ADMIN PANEL</h1>
        </div>
        <SidebarNav pendingCount={pendingCount} />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="w-full h-16 px-6 bg-zinc-50 border-b border-zinc-200 flex items-center justify-between">
          <h3 className="text-sm">SMART SEARCH</h3>
          <div>Admin</div>
        </header>

        <main className="flex-grow w-full max-w-screen-2xl mx-auto px-6 py-4">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
}

const SidebarNav = ({ pendingCount }: { pendingCount: number }) => {
  const navItems = [
    {
      name: "Dashboard",
      link: "/admin/overview/dashboard",
      icon: <LayoutDashboard className="size-5" />,
    },
    {
      name: "Pending Listings",
      link: "/admin/overview/pending-listings",
      icon: <Hourglass className="size-5" />,
      badge: pendingCount,
    },
    {
      name: "Registered Landlords",
      link: "/admin/overview/admin/registered-landlords",
      icon: <BadgeCheck className="size-5" />,
    },
    {
      name: "Reports",
      link: "/admin/reports",
      icon: <FileWarning className="size-5" />,
    },
  ];

  return (
    <nav className="flex flex-col p-4 gap-2">
      {navItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.link}
          className={({ isActive }) =>
            [
              "flex items-center gap-3 px-4 py-2 rounded-md text-sm hover:bg-zinc-100",
              isActive
                ? "bg-zinc-100 font-semibold text-zinc-900"
                : "text-zinc-600",
            ].join(" ")
          }
        >
          {item.icon}
          <span className="flex items-center gap-2">
            {item.name}
            {item.badge !== undefined && item.badge > 0 && (
              <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium bg-red-500 text-white rounded-full">
                {item.badge}
              </span>
            )}
          </span>
        </NavLink>
      ))}
    </nav>
  );
};
