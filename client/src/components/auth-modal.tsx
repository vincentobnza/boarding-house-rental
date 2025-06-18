import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { LogIn, UserPlus } from "lucide-react";

type TabsValue = "login" | "signup";

export default function AuthModal(props: {
  open: boolean;
  handleOpenChange: (open: boolean) => void;
  defaultValue?: TabsValue;
}) {
  return (
    <Dialog open={props.open} onOpenChange={props.handleOpenChange}>
      <DialogContent className="z-[999999] flex flex-col items-center justify-center">
        <DialogHeader>Welcome to Smart Search</DialogHeader>
        <Tabs
          defaultValue={props.defaultValue || "login"}
          className="mx-auto w-[400px]"
        >
          <TabsList className="flex h-12 w-full justify-center">
            <TabsTrigger value="login">
              <LogIn className="mr-2 size-4" />
              Login
            </TabsTrigger>
            <TabsTrigger value="signup">
              <UserPlus className="mr-2 size-4" />
              Signup
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <form className="flex flex-col gap-4">
              <Input type="email" placeholder="Email" required />
              <Input type="password" placeholder="Password" required />
              <Button type="submit" className="h-12 w-full rounded-md">
                Login
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="signup">
            <form className="flex flex-col gap-4">
              <Input type="email" placeholder="Email" required />
              <Input type="password" placeholder="Password" required />
              <Input type="password" placeholder="Confirm Password" required />
              <Button type="submit" className="h-12 w-full rounded-md">
                Signup
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
