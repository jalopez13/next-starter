import { pgTable, text } from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  username: text("username").notNull().unique(),
  googleId: text("google_id"),
  hashedPassword: text("hashed_password").notNull(),
});

export type User = typeof userTable.$inferSelect;
