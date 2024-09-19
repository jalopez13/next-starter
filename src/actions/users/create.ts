import { db } from "@/db";
import { User } from "@/db/schema";

type UserType = {
  username: string;
  password: string;
  email: string;
};

export const createUser = async (user: UserType) => {
  try {
    return await db.insert(User).values(user).returning({
      id: User.id,
    });
  } catch (error) {
    console.error("Error creating user:", error);
  }
};
