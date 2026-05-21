import { db } from '$lib/server/db';
import { studentsTable } from '$lib/server/db/schema';
import { error, fail, } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { eq } from 'drizzle-orm';
import { getAllVisibleStudentIds, getAllVisibleStudents } from '$lib/server/db/getters';

export const load: PageServerLoad = async ({ depends, locals}) => {
  if (!locals.auth) throw error(401, 'Unauthorized');

  const students = await getAllVisibleStudents();
  depends("app:reload");

  return {
    students
  };

};

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData()
    const name = data.get("name")?.toString();
    const id = Number(data.get("id")?.toString()); //"fail missing"
    if (!name || !id) {
      return fail(400, {id, missing: true});

    }
    const ids = await getAllVisibleStudentIds();

    //"fail repeated"
    if (ids.includes(id)) {
      return fail(400, {id, repeated: true});
    }

    await db.update(studentsTable).set({visible: true}).where(eq(studentsTable.id, id))

    return ({id, success: true})

  } 
} satisfies Actions;
