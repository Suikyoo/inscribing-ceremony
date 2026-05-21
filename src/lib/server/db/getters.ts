import { eq, type InferSelectModel } from "drizzle-orm";
import { db } from ".";
import { studentsTable } from "./schema";

export async function getAllVisibleStudents(): Promise<InferSelectModel<typeof studentsTable>[]> {
  return await db.select().from(studentsTable).where(eq(studentsTable.visible, true));
};
export async function getAllVisibleStudentIds(): Promise<number[]> {
  const student_ids = await db.select({id: studentsTable.id}).from(studentsTable).where(eq(studentsTable.visible, true));
  return student_ids.map(i => i.id);
};
export async function getVisibleStudentsById(id: number): Promise<InferSelectModel<typeof studentsTable>[]> {
  return await db.select().from(studentsTable).where(eq(studentsTable.id, Number(id)));
}
