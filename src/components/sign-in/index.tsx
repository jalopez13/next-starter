"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { z } from "zod";

import { signInAction } from "@/actions/auth/sign-in";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { SignInSchema } from "@/types";

import { zodResolver } from "@hookform/resolvers/zod";

export const SignIn = () => {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof SignInSchema>) => {
    const response = await await signInAction(values);

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

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="w-full">
        <CardTitle className="text-4xl font-bold">Sign In</CardTitle>
        <CardDescription>Sign into your account to continue.</CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-8"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-lg">Username</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your password..."
                      className="p-6 text-lg"
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
                  <FormLabel className="text-lg">Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your username..."
                      className="p-6 text-lg"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              size={"full"}
              className="p-6 text-lg"
            >
              Sign Up
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex w-full flex-col items-center justify-center gap-2">
        <p>I don&apos;t have an account! No worries!</p>
        <Link
          href="/sign-up"
          className="text-sm"
        >
          Sign up
        </Link>
      </CardFooter>
    </Card>
  );
};
