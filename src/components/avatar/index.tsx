import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/db/schema";

export const UserAvatar = ({ user }: { user: User }) => {
  console.log(user);

  return (
    <Avatar>
      <AvatarImage
        src={user?.picture ?? undefined}
        alt={user?.username ?? "User avatar"}
      />
      <AvatarFallback>{user?.username?.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
};
