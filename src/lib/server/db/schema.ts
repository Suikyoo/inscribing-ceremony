import { pgTable, serial, text, boolean } from "drizzle-orm/pg-core";

export const studentsTable = pgTable('students', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
  description: text('description'),
  visible: boolean("visible").notNull().default(false),
});
