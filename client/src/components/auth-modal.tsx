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
      <DialogContent className="z-[9999] flex justify-center items-center flex-col">
        <DialogHeader>Welcome to Smart Search</DialogHeader>
        <Tabs
          defaultValue={props.defaultValue || "login"}
          className="w-[400px] mx-auto"
        >
          <TabsList className="flex justify-center w-full h-12">
            <TabsTrigger value="login">
              <LogIn className="size-4 mr-2" />
              Login
            </TabsTrigger>
            <TabsTrigger value="signup">
              <UserPlus className="size-4 mr-2" />
              Signup
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <form className="flex flex-col gap-4">
              <Input type="email" placeholder="Email" required />
              <Input type="password" placeholder="Password" required />
              <Button type="submit" className="w-full rounded-md h-12">
                Login
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="signup">
            <form className="flex flex-col gap-4">
              <Input type="email" placeholder="Email" required />
              <Input type="password" placeholder="Password" required />
              <Input type="password" placeholder="Confirm Password" required />
              <Button type="submit" className="w-full rounded-md h-12">
                Signup
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
