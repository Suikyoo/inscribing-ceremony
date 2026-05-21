import { studentsTable } from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';
import { type InferSelectModel } from 'drizzle-orm';

export const load: PageServerLoad = async ({fetch, depends}) => {
  const res = await fetch("/api/students");
  const students: InferSelectModel<typeof studentsTable>[] = await res.json();

  depends("app:reload");

  return {
    students
  };

};
