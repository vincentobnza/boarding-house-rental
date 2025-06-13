import { NavLink, Outlet } from "react-router-dom";
import { House, Mail, Ellipsis } from "lucide-react";
import Footer from "@/components/footer";

export default function LandlordLayout() {
  return (
    <div className="w-full flex flex-col min-h-screen">
      <nav>
        <header className="w-full h-18 bg-zinc-50 border-b border-zinc-200 flex justify-between items-center px-9">
          <h3 className="text-sm">SMART SEARCH</h3>
          <h1 className="text-2xl font-bold">RENTAL OWNER</h1>
          <div>Owner</div>
        </header>
        <Nav />
      </nav>
      <main className="flex-1 w-full max-w-screen-2xl mx-auto p-9 flex flex-col justify-center items-center">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

const Nav = () => {
  const navItems = [
    {
      name: "Listings",
      link: "/landlord/dashboard",
      icon: <House className="size-4" />,
    },
    {
      name: "Inbox",
      link: "/landlord/dashboard/inbox",
      icon: <Mail className="size-4" />,
    },
    {
      name: "Menu",
      link: "/landlord/dashboard/menu",
      icon: <Ellipsis className="size-4" />,
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
              "p-5 flex justify-center items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900",
              isActive
                ? "text-zinc-900 font-semibold border-b-2 border-zinc-900"
                : "",
            ].join(" ")
          }
        >
          {item.icon}
          <span className="text-lg">{item.name}</span>
        </NavLink>
      ))}
    </div>
  );
};
