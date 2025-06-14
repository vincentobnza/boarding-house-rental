import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Hourglass,
  BadgeCheck,
  FileWarning,
  LogOut,
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
      <aside className="fixed top-14 left-0 w-80 bg-white border-r border-zinc-200 flex flex-col p-2 min-h-screen">
        <SidebarNav pendingCount={pendingCount} />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="z-50 fixed w-full top-0 right-0 h-16 px-8 bg-zinc-50 border-b border-zinc-200 flex items-center justify-between">
          <h3 className="text-sm">SMART SEARCH</h3>
          <div>Admin</div>
        </header>

        <main className="mt-16 ml-80 flex-grow px-6 py-4">
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
      link: "dashboard",
      icon: <LayoutDashboard className="size-4" />,
    },
    {
      label: "Actions",
      name: "Pending Listings",
      link: "pending-listings",
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
    <nav className="mt-5 flex flex-col flex-1 p-4 gap-4 pb-20">
      <div className="flex-1">
        {Object.entries(groupedItems).map(([label, items]) => (
          <div key={label} className="mb-8">
            <h3 className="text-xs text-zinc-500 mb-2 px-2">{label}</h3>
            <div className="flex flex-col gap-1">
              {items.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.link}
                  className={({ isActive }) =>
                    [
                      "flex items-center gap-3 px-4 py-2 rounded-md text-md hover:bg-zinc-100",
                      isActive
                        ? "bg-zinc-50 font-semibold text-zinc-700"
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
      </div>

      <div className="mt-auto pt-10 border-t border-zinc-200">
        <button className="w-full flex items-center gap-3 px-4 py-2 rounded-md text-md hover:bg-zinc-100 text-zinc-500 bg-zinc-50">
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </nav>
  );
};
