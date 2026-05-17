import { db } from '$lib/server/db';
import { studentsTable } from '$lib/server/db/schema';
import { fail, } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { eq, type InferSelectModel } from 'drizzle-orm';
import { invalidateAll } from '$app/navigation';

export const load: PageServerLoad = async ({fetch, depends}) => {
  const res = await fetch("/api/students");
  const students: InferSelectModel<typeof studentsTable>[] = await res.json();

  depends("app:reload");

  return {
    students
  };

};

export const actions = {
  default: async ({ cookies, request }) => {
    const data = await request.formData()
    const name = data.get("name")?.toString();
    const id = Number(data.get("id")?.toString());
    //"fail missing"
    if (!name || !id) {
      return fail(400, {id, missing: true});

    }
    const raw_ids = await db.select({id: studentsTable.id})
    .from(studentsTable)
    .where(eq(studentsTable.visible, true))

    const ids = raw_ids.map(i => i.id);

    //"fail repeated"
    if (ids.includes(id)) {
      return fail(400, {id, repeated: true});
    }

    await db.update(studentsTable).set({visible: true}).where(eq(studentsTable.id, id))

    return ({id, success: true})

  } 
} satisfies Actions;
