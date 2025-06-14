import { NavLink, Outlet } from "react-router-dom";
import { House, Mail, BanknoteArrowUp } from "lucide-react";
import Footer from "@/components/footer";
import { ScrollRestoration } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function LandlordLayout() {
  return (
    <div className="w-full flex flex-col min-h-screen">
      <nav className="sticky top-0 z-[99999] w-full bg-white">
        <header className="w-full h-18 bg-zinc-50 border-b border-zinc-200 flex justify-between items-center px-9">
          <h3 className="text-sm">SMART SEARCH</h3>
          <h1 className="text-2xl font-bold">RENTAL OWNER</h1>
          <ProfileDropdown />
        </header>
        <Nav />
      </nav>
      <main className="flex-grow w-full flex flex-col justify-center max-w-screen-2xl mx-auto">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
}

const Nav = () => {
  const navItems = [
    {
      name: "Listings",
      link: "/landlord/dashboard/listings",
      icon: <House className="size-4" />,
    },
    {
      name: "Inbox",
      link: "/landlord/dashboard/inbox",
      icon: <Mail className="size-4" />,
      hasChip: true,
    },
    {
      name: "Inquirer",
      link: "/landlord/dashboard/menu",
      icon: <BanknoteArrowUp className="size-4" />,
      hasChip: true,
    },
  ];
  return (
    <div className="w-full p-1 border-b border-zinc-200 flex justify-center items-center px-9 gap-6">
      {navItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.link}
          className={({ isActive }) =>
            [
              "relative p-5 flex justify-center items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900",
              isActive
                ? "text-zinc-900 font-semibold border-b-2 border-zinc-900"
                : "",
            ].join(" ")
          }
        >
          {item.hasChip && (
            <span className="absolute top-1 -right-1 bg-orange-400 text-white text-xs rounded-full size-6 grid place-items-center">
              3
            </span>
          )}
          {item.icon}
          <span className="text-lg">{item.name}</span>
        </NavLink>
      ))}
    </div>
  );
};

const ProfileDropdown = () => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarImage
              src="https://cdn-icons-png.flaticon.com/128/727/727399.png"
              alt="@landlord owner"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 z-[999999]" align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
