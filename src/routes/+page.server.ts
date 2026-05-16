import { db } from '$lib/server/db';
import { studentsTable } from '$lib/server/db/schema';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
  return {
    students: await db.select().from(studentsTable).where(eq(studentsTable.visible, 1))
  };
};

export const actions = {
  default: async ({ cookies, request }) => {
    const data = await request.formData()
    const name = data.get("name")?.toString();
    const id = data.get("id")?.toString();

    //"fail missing"
    if (!name || !id) {
      return fail(400, {name, id, missing: true});

    }
    const id_objs = await db.select({id: studentsTable.id}).from(studentsTable);
    const ids = id_objs.map(i => i.id);

    //"fail repeated"
    if (ids.includes(id)) {
      return fail(400, {name, id, repeated: true});
    }

    const v = await db.update(studentsTable).set({visible: 1}).where(eq(studentsTable.id, id))
    return {name, id, success: true}

  } 
} satisfies Actions;
