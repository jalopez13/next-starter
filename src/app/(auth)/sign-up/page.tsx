import { redirect } from "next/navigation";

import { validateRequest } from "@/auth";
import { SignUpForm } from "@/components/sign-up";

const SignUpPage = async () => {
  const { user } = await validateRequest();

  if (user) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
