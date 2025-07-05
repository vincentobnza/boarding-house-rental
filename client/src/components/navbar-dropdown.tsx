import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { LogOutDialog } from "./modals/logout-modal";

type TabsValue = "login" | "signup";

export default function NavbarDropdown({
  onOpenModal,
}: {
  onOpenModal: (tab: TabsValue) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
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
        <DropdownMenuContent className="z-[9999] w-56" align="end">
          <DropdownMenuItem onClick={() => onOpenModal("login")}>
            Login
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onOpenModal("signup")}>
            Signup
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Help Center</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsOpen(true)}>
            Exit
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
}
