import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .min(2, { message: "Username must be at least 2 characters long" })
    .max(50, { message: "Username can't be longer than 50 characters long" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
});
