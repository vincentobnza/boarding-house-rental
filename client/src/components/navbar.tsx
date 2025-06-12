import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Navbar() {
  return (
    <nav className="w-full max-w-screen-2xl mx-auto p-9 flex items-center justify-between">
      <h1 className="text-lg font-bold">SMART SEARCH</h1>

      <ul className="flex items-center space-x-8">
        <li>
          <Link to="/" className="text-zinc-700 hover:text-zinc-900 text-lg">
            Ready to Smart Search?
          </Link>
        </li>
        <Avatar>
          <AvatarImage
            src="https://cdn-icons-png.flaticon.com/128/15678/15678795.png"
            alt="user-avatar"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </ul>
    </nav>
  );
}
