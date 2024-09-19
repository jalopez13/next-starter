import { redirect } from "next/navigation";

import { validateRequest } from "@/auth";
import { SignIn } from "@/components/sign-in";

const SignInPage = async () => {
  const { user } = await validateRequest();

  if (user) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <SignIn />
    </div>
  );
};

export default SignInPage;
