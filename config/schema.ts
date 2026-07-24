import { integer, json, pgTable, text, varchar } from "drizzle-orm/pg-core";


export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  credits: integer()
});

export const SessionChatTable = pgTable('sessionChatTble', {
  id : integer().primaryKey().generatedAlwaysAsIdentity(),
  sessionId : varchar().notNull(),
  notes : text(),
  selectedDoctor: json(),
  report: json(),
  conversation : json(),
  createdBy : varchar().references(()=>usersTable.email),
  createdOn: varchar()
})
