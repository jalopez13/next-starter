"use client";

import { signOutAction } from "@/actions/auth/sign-out";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/db/schema";
import { useToast } from "@/hooks/use-toast";

export const UserMenu = ({ user }: { user: User | null }) => {
  const { toast } = useToast();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-9 w-9 hover:cursor-pointer">
          <AvatarImage
            src={user?.picture}
            alt={user?.username || "User avatar"}
          />
          <AvatarFallback>{user?.username?.[0]?.toUpperCase() || "U"}</AvatarFallback>
          <span className="sr-only">Toggle user menu</span>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem className="cursor-pointer text-lg font-bold">{user?.username}</DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Button
            variant="outline"
            className="block w-full cursor-pointer text-left"
            onClick={async () => {
              await signOutAction();
              toast({
                title: "Success",
                description: "You have been logged out.",
              });
            }}
          >
            Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
