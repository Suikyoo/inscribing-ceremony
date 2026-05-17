import { db } from "$lib/server/db";
import { studentsTable } from "$lib/server/db/schema";
import type { RequestHandler } from "@sveltejs/kit";
import { json } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

//get all ids of records that are "visible"
export const GET: RequestHandler = async ({params}) => {
  const students = await db.select({id: studentsTable.id}).from(studentsTable).where(eq(studentsTable.visible, true));
  return json(students);
}
