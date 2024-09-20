"use server";

import { cookies } from "next/headers";

import { generateCodeVerifier, generateState } from "arctic";

import { googleOAuthClient } from "@/auth/oauth/google";

export const getGoogleOauthConsentUrl = async () => {
  try {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();

    cookies().set("codeVerifier", codeVerifier, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    cookies().set("state", state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    const authUrl = await googleOAuthClient.createAuthorizationURL(state, codeVerifier, {
      scopes: ["email", "profile"],
    });
    return { success: true, url: authUrl.toString() };
  } catch (error) {
    console.error("Error in getGoogleOauthConsentUrl:", error);
    return { success: false, error: "Something went wrong" };
  }
};
