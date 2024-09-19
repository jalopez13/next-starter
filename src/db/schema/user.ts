import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export type User = typeof users.$inferSelect;

// export const UsersRelations = relations(users, ({ many }) => ({
//   todos: many(TABLE),
// }));

// export type User = typeof User.$inferSelect;

// export type UserOptionalSchemaType = Omit<
//   UserSchemaType,
//   'username' | 'email' | 'password'
// > & {
//   username: UserSchemaType['username'];
//   email: UserSchemaType['email'];
//   password: UserSchemaType['password'];
// };
