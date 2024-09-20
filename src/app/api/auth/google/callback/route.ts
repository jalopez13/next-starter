import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

import { eq } from "drizzle-orm";

import { lucia } from "@/auth";
import { googleOAuthClient } from "@/auth/oauth/google";
import { db } from "@/db";
import { userTable } from "@/db/schema/user";

export async function GET(req: NextRequest) {
  const url = req.nextUrl;
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  if (!code || !state) {
    console.error("no code or state");
    return new Response("Invalid Request", { status: 400 });
  }

  const codeVerifier = cookies().get("codeVerifier")?.value;
  const savedState = cookies().get("state")?.value;

  if (!codeVerifier || !savedState) {
    console.error("no code verifier or state");
    return new Response("Invalid Request", { status: 400 });
  }

  if (state !== savedState) {
    console.error("state mismatch");
    return new Response("Invalid Request", { status: 400 });
  }

  const { accessToken } = await googleOAuthClient.validateAuthorizationCode(code, codeVerifier);
  const googleResponse = await fetch("https://www.googleapis.com/oauth2/v1/userinfo", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const user = await googleResponse.json();

  let userId: string = "";
  // if the email exists in our record, we can create a cookie for them and sign them in
  // if the email doesn't exist, we create a new user, then craete cookie to sign them in

  const existingUser = await db.query.userTable.findFirst({
    where: eq(userTable.email, user.email),
  });

  if (existingUser) {
    userId = existingUser.id;
  } else {
    const newUser = await db
      .insert(userTable)
      .values({
        username: user.username,
        email: user.email,
        picture: user.picture,
        role: "user",
        hashedPassword: "",
      })
      .returning();
    userId = newUser[0].id;
  }

  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

  return redirect("/");
}
