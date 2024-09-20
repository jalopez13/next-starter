import { cookies } from "next/headers";
import { cache } from "react";

import { Lucia, TimeSpan } from "lucia";

import { db } from "@/db";
import { sessionTable, userTable } from "@/db/schema";
import env from "@/env";

import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";

const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable);

export const lucia = new Lucia(adapter, {
  getSessionAttributes: (/* attributes */) => {
    return {
      // sessionId: attributes.sessionId,
    };
  },
  getUserAttributes: attributes => {
    return {
      id: attributes.id,
      email: attributes.email,
      username: attributes.username,
      picture: attributes.picture,
      role: attributes.role,
    };
  },
  sessionExpiresIn: new TimeSpan(30, "d"),
  sessionCookie: {
    name: "next-starter-session", // change to your session name
    expires: false, // session cookies have very long lifespan (2 years)
    attributes: {
      secure: env.NODE_ENV === "production",
    },
  },
});

export const validateRequest = cache(async () => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;

  if (!sessionId)
    return {
      user: null,
      session: null,
    };

  const { user, session } = await lucia.validateSession(sessionId);

  try {
    if (session && session.fresh) {
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    }
    if (!session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    }
  } catch {
    // Next.js throws error when attempting to set cookies when rendering page
  }
  return {
    user,
    session,
  };
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  id: string;
  google_id: string;
  username: string;
  email: string;
  picture: string;
  role: string;
}
