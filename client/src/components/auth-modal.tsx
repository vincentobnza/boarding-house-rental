import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function AuthModal(props: {
  open: boolean;
  handleOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={props.open} onOpenChange={props.handleOpenChange}>
      <DialogContent className="z-[9999]">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
