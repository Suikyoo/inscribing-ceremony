import { getAllVisibleStudents } from '$lib/server/db/getters';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({depends}) => {
  const students = await getAllVisibleStudents();

  depends("app:reload");

  return {
    students
  };

};
