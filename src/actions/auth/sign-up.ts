"use server";

import { cookies } from "next/headers";

import { eq } from "drizzle-orm";
import { z } from "zod";

import { lucia } from "@/auth";
import db from "@/db";
import { userTable } from "@/db/schema";
import { signUpSchema } from "@/validators";

import { Argon2id } from "oslo/password";

export const signUpAction = async (values: z.infer<typeof signUpSchema>) => {
  console.log("passed data: ", values);

  try {
    // if user already exists, throw an error
    const existingUser = await db.select().from(userTable).where(eq(userTable.username, values.username)).limit(1);

    if (existingUser.length > 0) {
      return { error: "User already exists", success: false };
    }

    const hashedPassword = await new Argon2id().hash(values.password);

    const user = await db
      .insert(userTable)
      .values({
        username: values.username.toLowerCase(),
        email: values.email,
        hashedPassword,
        picture: "", // Add a default empty string for the picture field
        role: "user", // Add a default role, adjust as needed
      })
      .returning();

    const session = await lucia.createSession(user[0].id, {});
    const sessionCookie = await lucia.createSessionCookie(session.id);
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message, success: false };
    }
    return { error: "An unknown error occurred", success: false };
  }
};
