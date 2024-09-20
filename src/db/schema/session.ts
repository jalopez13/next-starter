import { userTable } from "@/db/schema";

import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const sessionTable = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export type Session = typeof sessionTable.$inferSelect;
