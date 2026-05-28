import { pgTable, serial, text, boolean } from "drizzle-orm/pg-core";

export const studentsTable = pgTable('students', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
  img: text('img'),
});
export const dataTable = pgTable('data', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
  img: text('img'),
});
