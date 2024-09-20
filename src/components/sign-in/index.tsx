"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { z } from "zod";

import { getGoogleOauthConsentUrl } from "@/actions/auth/oauth/google";
import { signInAction } from "@/actions/auth/sign-in";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { signInSchema } from "@/validators";

import { zodResolver } from "@hookform/resolvers/zod";
import { FcGoogle } from "react-icons/fc";

export const SignInForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    const response = await signInAction(values);

    if (response.error) {
      toast({
        title: response.error,
        variant: "destructive",
      });
    } else {
      toast({
        title: "You have signed in successfully!",
      });
      router.push("/");
    }
  };

  const handleSignInWithGoogle = async () => {
    const response = await getGoogleOauthConsentUrl();

    if (response.error) {
      toast({
        title: response.error,
        variant: "destructive",
      });
    } else if (response.url) {
      router.push(response.url);
    } else {
      toast({
        title: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full max-w-md p-6">
      <Card className="w-full">
        <CardHeader className="w-full">
          <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
          <CardDescription className="text-muted-foreground">Sign into your account to continue</CardDescription>
        </CardHeader>
        <CardContent className="w-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-md tracking-wide">Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="Enter your email..."
                        className="px-4 py-6 text-lg placeholder:text-sm placeholder:tracking-wide"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-md tracking-wide">Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Enter your password..."
                        className="px-4 py-6 text-lg placeholder:text-sm placeholder:tracking-wide"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                size="full"
                className="p-6 text-lg transition-colors duration-500"
              >
                Sign In
              </Button>
            </form>
          </Form>
        </CardContent>

        <div className="mb-4 flex flex-row items-center justify-center gap-2 px-6 py-0 text-center text-sm text-muted-foreground">
          <Separator className="w-1/3" />
          <div className="w-1/3">OR</div>
          <Separator className="w-1/3" />
        </div>

        <div className="p-4">
          <Button
            variant="outline"
            className="w-full space-x-2 p-6 text-lg transition-colors duration-500"
            onClick={handleSignInWithGoogle}
          >
            <FcGoogle className="h-6 w-6" /> <span>Sign in with Google</span>
          </Button>
        </div>

        <CardFooter className="flex w-full flex-col items-center justify-center gap-2">
          <p className="text-muted-foreground">I don&apos;t have an account! No worries!</p>
          <Link
            href="/sign-up"
            className="text-sm text-muted-foreground transition-colors duration-500 hover:text-foreground"
          >
            Sign up
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};
