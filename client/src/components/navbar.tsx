import { Link } from "react-router-dom";
import NavbarDropdown from "./navbar-dropdown";
import AuthModal from "./auth-modal";
import { useState } from "react";

type TabsValue = "login" | "signup";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [defaultTab, setDefaultTab] = useState<TabsValue>("login");

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  const handleOpenModal = (tab: TabsValue) => {
    setDefaultTab(tab);
    setOpen(true);
  };

  return (
    <nav className="w-full max-w-screen-2xl mx-auto p-9 flex items-center justify-between border-b border-zinc-300">
      <h1 className="text-lg font-bold">SMART SEARCH</h1>

      <ul className="flex items-center space-x-8">
        <li>
          <Link to="/" className="text-zinc-700 hover:text-zinc-900 text-lg">
            Ready to Smart Search?
          </Link>
        </li>
        <NavbarDropdown onOpenModal={handleOpenModal} />
        <AuthModal
          open={open}
          handleOpenChange={handleOpenChange}
          defaultValue={defaultTab}
        />
      </ul>
    </nav>
  );
}
