import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const studentsTable = sqliteTable('students', {
	id: integer('id').primaryKey(),
	name: text('name').notNull(),
  description: text('description'),
  visible: integer("visible").notNull().default(0),
});
