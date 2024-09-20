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
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { signUpSchema } from "@/validators";

import { zodResolver } from "@hookform/resolvers/zod";

export const SignUpForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
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
    <div className="w-full max-w-md p-6">
      <Card className="w-full">
        <CardHeader className="w-full">
          <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
          <CardDescription className="text-muted-foreground">Sign up to get started</CardDescription>
        </CardHeader>
        <CardContent className="w-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-4"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-md tracking-wide">Username</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your username..."
                        className="px-4 py-6 text-lg placeholder:text-sm placeholder:tracking-wide"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-md tracking-wide">Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
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
                        placeholder="Enter your password..."
                        className="px-4 py-6 text-lg placeholder:text-sm placeholder:tracking-wide"
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
                    <FormLabel className="text-md tracking-wide">Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Re-enter your password..."
                        className="px-4 py-6 text-lg placeholder:text-sm placeholder:tracking-wide"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                size={"full"}
                className="p-6 text-lg transition-colors duration-500"
              >
                Sign Up
              </Button>
            </form>
          </Form>
        </CardContent>

        <div className="mb-4 flex flex-row items-center justify-center gap-2 px-6 py-0 text-center text-sm text-muted-foreground">
          <Separator className="w-1/3" />
          <div className="w-1/3">OR</div>
          <Separator className="w-1/3" />
        </div>

        <CardFooter className="flex w-full flex-col items-center justify-center gap-2">
          <p className="text-sm text-muted-foreground">Already have an account?</p>
          <Link
            href="/sign-in"
            className="text-sm text-muted-foreground transition-colors duration-500 hover:text-foreground"
          >
            Sign in
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};
