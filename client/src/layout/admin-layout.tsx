import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Hourglass,
  BadgeCheck,
  FileWarning,
} from "lucide-react";
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
        <div className="h-18 px-6 py-4 flex items-center justify-between">
          <h1 className="text-sm font-bold">ADMIN PANEL</h1>
        </div>
        <SidebarNav pendingCount={pendingCount} />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 px-14 bg-zinc-50 border-b border-zinc-200 flex items-center justify-between">
          <h3 className="text-sm">SMART SEARCH</h3>
          <div>Admin</div>
        </header>

        <main className="flex-grow w-full max-w-screen-xl mx-auto px-6 py-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

const SidebarNav = ({ pendingCount }: { pendingCount: number }) => {
  const navItems = [
    {
      label: "Dashboard",
      name: "Overview",
      link: "/admin/dashboard/dashboard",
      icon: <LayoutDashboard className="size-4" />,
    },
    {
      label: "Actions",
      name: "Pending Listings",
      link: "/admin/dashboard/pending-list",
      icon: <Hourglass className="size-4" />,
      badge: pendingCount,
    },
    {
      label: "Actions",
      name: "Registered Landlords",
      link: "/admin/registered-landlords",
      icon: <BadgeCheck className="size-4" />,
    },
    {
      label: "Actions",
      name: "Reports",
      link: "/admin/reports",
      icon: <FileWarning className="size-4" />,
    },
  ];

  // Group items by label
  const groupedItems = navItems.reduce((acc, item) => {
    if (!acc[item.label]) {
      acc[item.label] = [];
    }
    acc[item.label].push(item);
    return acc;
  }, {} as Record<string, typeof navItems>);

  return (
    <nav className="mt-5 flex flex-col p-4 gap-4">
      {Object.entries(groupedItems).map(([label, items]) => (
        <div key={label} className="mb-3">
          <h3 className="text-xs font-semibold text-zinc-500 tracking-wider mb-2 px-2">
            {label}
          </h3>
          <div className="flex flex-col gap-1">
            {items.map((item) => (
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
                    <span className="ml-2 inline-flex items-center justify-center px-3 py-0.5 text-xs font-medium bg-amber-500 text-white rounded-full">
                      {item.badge}
                    </span>
                  )}
                </span>
              </NavLink>
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
};
