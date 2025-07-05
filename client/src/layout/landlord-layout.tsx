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
import { useLocation } from "react-router-dom";
import NavbarImage from "@/assets/navbar-image.jpg";
import { LogOutDialog } from "@/components/modals/logout-modal";
import { useState } from "react";

export default function LandlordLayout() {
  const location = useLocation();
  const shouldShowFooter = location.pathname === "/landlord/dashboard/inbox";
  return (
    <div className="flex min-h-screen w-full flex-col">
      <nav className="sticky top-0 z-[99999] w-full bg-white">
        <header className="relative flex w-full items-center justify-between overflow-hidden border-b border-zinc-200 bg-zinc-50 p-3 px-9">
          <img
            src={NavbarImage}
            alt="image"
            className="absolute inset-0 w-full object-cover opacity-20"
          />
          <h3 className="text-sm font-bold">SMART SEARCH</h3>
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/128/6676/6676684.png"
              alt="owner"
              className="size-6"
            />
            <h1 className="text-xl font-bold">RENTAL OWNER</h1>
          </div>
          <ProfileDropdown />
        </header>
        <Nav />
      </nav>
      <main className="mx-auto flex w-full max-w-screen-2xl flex-grow flex-col justify-center">
        <Outlet />
      </main>
      {!shouldShowFooter && <Footer />}
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
      link: "/landlord/dashboard/inquirer",
      icon: <BanknoteArrowUp className="size-4" />,
      hasChip: true,
    },
  ];
  return (
    <div className="flex w-full items-center justify-center gap-6 border-b border-zinc-200 bg-white p-1 px-9">
      {navItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.link}
          className={({ isActive }) =>
            [
              "relative flex items-center justify-center gap-2 p-5 text-sm text-zinc-600 hover:text-zinc-900",
              isActive
                ? "border-b-2 border-zinc-900 font-semibold text-zinc-900"
                : "",
            ].join(" ")
          }
        >
          {item.hasChip && (
            <span className="absolute top-1 -right-1 grid size-6 place-items-center rounded-full bg-orange-400 text-xs text-white">
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
  const [isOpen, setIsOpen] = useState(false);
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
        <DropdownMenuContent className="z-[999999] w-56" align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsOpen(true)}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <LogOutDialog
        redirectAfterLogoutUrl="/"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
};
