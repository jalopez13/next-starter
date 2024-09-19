"use server";

import { cookies } from "next/headers";

import { z } from "zod";

import { lucia } from "@/auth";
import db from "@/db";
import { SignInSchema } from "@/types";

import { Argon2id } from "oslo/password";

export const signInAction = async (values: z.infer<typeof SignInSchema>) => {
  const existingUser = await db.query.userTable.findFirst({
    where: (table, { eq }) => eq(table.username, values.username),
  });

  // validate user not exists
  if (!existingUser) {
    return {
      error: "User not found",
    };
  }

  // validate hashedPassword
  if (!existingUser.hashedPassword) {
    return {
      error: "Invalid password",
    };
  }

  // validate password
  const isValidPassword = await new Argon2id().verify(existingUser.hashedPassword, values.password);

  if (!isValidPassword) {
    return {
      error: "Incorrect username or password",
    };
  }

  // create session
  const session = await lucia.createSession(existingUser.id, {
    expiresIn: 60 * 60 * 24 * 30,
  });

  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

  return {
    success: true,
  };
};
