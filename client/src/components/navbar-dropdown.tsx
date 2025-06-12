import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function NavbarDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage
            src="https://cdn-icons-png.flaticon.com/128/15678/15678795.png"
            alt="user-avatar"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 z-[9999]" align="end">
        <DropdownMenuItem>Login</DropdownMenuItem>
        <DropdownMenuItem>Signup</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Help Center</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
