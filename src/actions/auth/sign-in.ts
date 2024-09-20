"use server";

import { cookies } from "next/headers";

import { eq } from "drizzle-orm";
import { z } from "zod";

import { lucia } from "@/auth";
import db from "@/db";
import { userTable } from "@/db/schema";
import { signInSchema } from "@/validators";

import { Argon2id } from "oslo/password";

export const signInAction = async (values: z.infer<typeof signInSchema>) => {
  const user = await db.select().from(userTable).where(eq(userTable.email, values.email)).limit(1);

  if (!user || user.length === 0 || !user[0].hashedPassword) {
    return { success: false, error: "Invalid Credentials!" };
  }

  const passwordMatch = await new Argon2id().verify(user[0].hashedPassword, values.password);

  if (!passwordMatch) {
    return { success: false, error: "Invalid Credentials!" };
  }

  // successfully login
  const session = await lucia.createSession(user[0].id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

  return { success: true };
};

// "use server";

// import { cookies } from "next/headers";

// import { z } from "zod";

// import { lucia } from "@/auth";
// import db from "@/db";
// import { signInSchema } from "@/validators";

// import { Argon2id } from "oslo/password";

// export const signInAction = async (values: z.infer<typeof signInSchema>) => {
//   const existingUser = await db.query.userTable.findFirst({
//     where: (table, { eq }) => eq(table.email, values.email),
//   });

//   // validate user not exists
//   if (!existingUser) {
//     return {
//       error: "User not found",
//     };
//   }

//   // validate hashedPassword
//   if (!existingUser.hashedPassword) {
//     return {
//       error: "Invalid password",
//     };
//   }

//   // validate hashedPassword
//   const isValidPassword = await new Argon2id().verify(existingUser.hashedPassword, values.password);

//   if (!isValidPassword) {
//     return {
//       error: "Incorrect username or password",
//     };
//   }

//   // create session
//   const session = await lucia.createSession(existingUser.id, {
//     expiresIn: 60 * 60 * 24 * 30,
//   });

//   const sessionCookie = lucia.createSessionCookie(session.id);

//   cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

//   return {
//     success: true,
//   };
// };
