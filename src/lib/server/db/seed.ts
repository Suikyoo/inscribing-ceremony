import type { InferInsertModel } from "drizzle-orm"
import { studentsTable } from "./schema"
import { db } from ".";

export const seed = async() => {
  const data: InferInsertModel<typeof studentsTable>[] = [];
  for (let i=0; i<20; i++) {
    data.push({
      id: i,
      name: `person ${i}`,
      description: `this is person ${i}`,
      visible: false,
    })
  }
  await db.insert(studentsTable).values(data).onConflictDoNothing({target: studentsTable.id});
}

