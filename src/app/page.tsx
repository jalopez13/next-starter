import { redirect } from "next/navigation";

import { validateRequest } from "@/auth";
import { Button } from "@/components/ui/button";
import { UserMenu } from "@/components/user-menu";
import { User } from "@/db/schema";

const IndexPage = async () => {
  const { user } = (await validateRequest()) as { user: User | null };

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <>
      <div className="fixed left-0 right-0 top-0 items-center justify-center border-b p-6 text-right">
        <div className="flex flex-row items-center justify-end space-x-2">
          {user && (
            <div className="flex flex-row items-center space-x-2">
              <UserMenu user={user} />
            </div>
          )}
        </div>
      </div>
      <div className="flex h-screen flex-col items-center justify-center space-y-4">
        <h1 className="text-6xl">Index Page -</h1>
        <p>Let`&apos`s get crackin!</p>

        <Button>Schad/cn Rocks!</Button>
      </div>
    </>
  );
};

export default IndexPage;
