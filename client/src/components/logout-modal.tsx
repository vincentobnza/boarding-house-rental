import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Loader, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

type LogOutDialogProps = {
  redirectAfterLogoutUrl: string;
  delay?: number;
};
export const LogOutDialog = ({
  redirectAfterLogoutUrl,
  delay = 3000,
}: LogOutDialogProps) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(redirectAfterLogoutUrl);
    }, delay);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full rounded">
          <LogOut />
          Logout
        </Button>
      </DialogTrigger>
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
