"use server";

import { cookies } from "next/headers";

import { generateId } from "lucia";
import { z } from "zod";

import { lucia } from "@/auth";
import db from "@/db";
import { userTable } from "@/db/schema";
import { SignUpSchema } from "@/types";

import { Argon2id } from "oslo/password";

export const signUpAction = async (values: z.infer<typeof SignUpSchema>) => {
  // hash password
  const hashedPassword = await new Argon2id().hash(values.password);

  // generate user id
  const userId = generateId(15);

  // insert user into database
  try {
    await db
      .insert(userTable)
      .values({
        id: userId,
        username: values.username,
        hashedPassword: hashedPassword,
      })
      .returning({
        id: userTable.id,
        username: userTable.username,
      });

    // create session
    const session = await lucia.createSession(userId, {
      expiresIn: 60 * 60 * 24 * 30,
    });

    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    return {
      success: true,
      data: {
        userId,
      },
    };
  } catch (error: unknown) {
    return {
      error: error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};
