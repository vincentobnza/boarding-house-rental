import { Link } from "react-router-dom";
import NavbarDropdown from "./navbar-dropdown";
import AuthModal from "./auth-modal";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
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
        <NavbarDropdown setIsOpen={setOpen} />
        <AuthModal open={open} handleOpenChange={handleOpenChange} />
      </ul>
    </nav>
  );
}
