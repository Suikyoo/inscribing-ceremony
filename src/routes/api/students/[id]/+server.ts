import { db } from "$lib/server/db";
import { studentsTable } from "$lib/server/db/schema";
import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

export const GET: RequestHandler = async ({params}) => {
  const { id } = params
  const students = await db.select().from(studentsTable).where(eq(studentsTable.id, Number(id)));
  if (!students.length) return json(null);

  return json(students[0]);
}
