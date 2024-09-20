import { pgTable, text } from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  email: text("email").notNull().unique(),
  username: text("username").notNull(),
  picture: text("picture").notNull(),
  role: text("role").notNull(),
  hashedPassword: text("password_hash").notNull(),
});

export type User = Omit<typeof userTable.$inferSelect, "hashedPassword">;
