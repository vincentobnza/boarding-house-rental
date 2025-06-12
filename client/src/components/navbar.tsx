import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full max-w-screen-xl mx-auto p-8 flex items-center justify-between">
      <h1>BOARDING HIVE</h1>

      <ul className="flex items-center space-x-8">
        <li>
          <Link to="/" className="text-zinc-700 hover:text-zinc-900">
            SERVICES
          </Link>
        </li>
        <li>
          <Link to="/" className="text-zinc-700 hover:text-zinc-900">
            ABOUT
          </Link>
        </li>
        <li>
          <Link to="/" className="text-zinc-700 hover:text-zinc-900">
            TEAM
          </Link>
        </li>
      </ul>
    </nav>
  );
}
