"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { z } from "zod";

import { signUpAction } from "@/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { SignUpSchema } from "@/types";

import { zodResolver } from "@hookform/resolvers/zod";

export const SignUp = () => {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof SignUpSchema>) => {
    const response = await signUpAction(values);

    if (response.error) {
      toast({
        title: response.error,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Successfully signed up",
      });
      router.push("/");
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="w-full">
        <CardTitle className="text-4xl font-bold">Sign Up</CardTitle>
        <CardDescription>Sign up to get started</CardDescription>
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-lg">Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Re-enter your password..."
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
        <p>Already have an account?</p>
        <Link
          href="/sign-in"
          className="text-sm"
        >
          Sign in
        </Link>
      </CardFooter>
    </Card>
  );
};
