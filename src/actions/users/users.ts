import { db } from "@/db";
import { User } from "@/db/schema";

export const Users = async () => {
  try {
    return await db.select().from(User);
  } catch (error) {
    console.error("Error creating user:", error);
  }
};
