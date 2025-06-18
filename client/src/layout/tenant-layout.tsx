import Footer from "@/components/footer";
import { Heart, MessageCircle, Search } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { School, House, Warehouse } from "lucide-react";

export default function TenantLayout() {
  const navigationItems = [
    {
      name: "Near School",
      link: "/tenant/near-school",
      icon: <School className="size-4" />,
    },
    {
      name: "Rental House",
      link: "/tenant/rental-house",
      icon: <House className="size-4" />,
    },
    {
      name: "Boarding House",
      link: "/tenant/boarding-house",
      icon: <Warehouse className="size-4" />,
    },
    {
      name: "Chat",
      link: "/tenant/chat",
      icon: <MessageCircle className="size-4" />,
    },
    {
      name: "Bookmarks",
      link: "/tenant/bookmarks",
      icon: <Heart className="size-4" />,
    },
  ];
  return (
    <div className="flex min-h-screen w-full flex-col">
      <nav className="sticky top-0 z-[99999] w-full bg-white">
        <header className="relative flex w-full items-center justify-between overflow-hidden border-b border-zinc-200 bg-zinc-50 p-5 px-9">
          <h3 className="text-sm font-bold">SMART SEARCH</h3>
          <SearchBar />
          <Avatar className="h-10 w-10 cursor-pointer rounded-full">
            <AvatarImage
              src="https://cdn-icons-png.flaticon.com/128/3940/3940417.png"
              alt="User Avatar"
            />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </header>

        <div className="w-full">
          <ul className="mx-auto flex w-full max-w-screen-lg items-center justify-center space-x-6 border-b border-zinc-200 bg-white px-9 py-3">
            {navigationItems.map((item) => (
              <li key={item.name} className="flex items-center space-x-2">
                <NavLink
                  to={item.link}
                  className={({ isActive }) =>
                    `flex flex-col items-center gap-2 text-sm font-medium ${
                      isActive
                        ? "border-b-2 border-amber-600 text-amber-600"
                        : "text-zinc-700 hover:text-zinc-900"
                    }`
                  }
                >
                  {item.icon}
                  <span className="ml-1">{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <main className="mx-auto flex w-full max-w-screen-2xl flex-grow flex-col justify-center">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

const SearchBar = () => {
  return (
    <div className="flex h-10 w-[400px] cursor-pointer items-center justify-center gap-4 rounded-lg border border-zinc-300 bg-white">
      <Search size={18} />
      <p>Start your search</p>
    </div>
  );
};
