import { redirect } from "next/navigation";

import { signOutAction } from "@/actions/auth/sign-out";
import { validateRequest } from "@/auth";
import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

const IndexPage = async () => {
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <>
      <div className="fixed left-0 right-0 top-0 items-center justify-center border-b p-6 text-right">
        <div className="flex flex-row items-center justify-end space-x-2">
          {user && (
            <form action={signOutAction}>
              <Button
                type="submit"
                variant={"outline"}
              >
                Log out
              </Button>
            </form>
          )}
          <ModeToggle />
        </div>
      </div>
      <div className="flex h-screen flex-col items-center justify-center space-y-4">
        <h1 className="text-6xl">Index Page -</h1>
        <p>Let&apos;s get crackin!</p>

        {JSON.stringify(user)}
        <Button>Schad/cn Rocks!</Button>
      </div>
    </>
  );
};

export default IndexPage;
