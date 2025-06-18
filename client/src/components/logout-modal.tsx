import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";
import { useLogout } from "@/hooks/useLogout";
export const LogOutDialog = ({
  redirectAfterLogoutUrl = "/",
  delay = 3000,
  isOpen,
  setIsOpen,
}: {
  redirectAfterLogoutUrl?: string;
  delay?: number;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const { loading, handleLogout } = useLogout({
    redirectAfterLogoutUrl: redirectAfterLogoutUrl,
    delay: delay || 0,
  });
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
      }}
    >
      <DialogContent className="z-[999999] sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Logout</DialogTitle>
          <DialogDescription>
            Are you sure you want to log out? You will need to log in again to
            access your account.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-8 flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline" className="rounded">
              Cancel
            </Button>
          </DialogClose>
          <Button
            disabled={loading}
            onClick={handleLogout}
            className={`rounded bg-orange-500 text-white shadow-none hover:bg-orange-600 ${loading ? "cursor-not-allowed opacity-40" : ""}`}
          >
            {loading && <Loader className="animate-spin" />}
            Logout
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
