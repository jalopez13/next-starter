"use server";

import { cookies } from "next/headers";

import { lucia, validateRequest } from "@/auth";

export const signOutAction = async () => {
  try {
    const { session } = await validateRequest();

    if (!session) {
      return {
        error: {
          message: "Unauthorized",
        },
      };
    }

    await lucia.invalidateSession(session.id);

    const sessionCookie = lucia.createBlankSessionCookie();
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};
