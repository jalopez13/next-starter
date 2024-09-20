import { Google } from "arctic";

import env from "@/env";

export const googleOAuthClient = new Google(
  env.GOOGLE_AUTH_CLIENT_ID!,
  env.GOOGLE_AUTH_CLIENT_SECRET!,
  env.GOOGLE_AUTH_CALLBACK_URL!
);
