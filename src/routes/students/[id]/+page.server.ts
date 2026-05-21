import { getVisibleStudentsById } from "$lib/server/db/getters";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({params}) => {
  const students = await getVisibleStudentsById(Number(params.id));

  return {
    students
  };

};

