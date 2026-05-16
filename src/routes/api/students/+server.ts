import { db } from "$lib/server/db";
import { studentsTable } from "$lib/server/db/schema";
import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

export const GET: RequestHandler = async () => {
  const students = await db.select().from(studentsTable).where(eq(studentsTable.visible, 1));
  return json(students);
}
