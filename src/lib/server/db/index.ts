import { DATABASE_URL } from '$env/static/private'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { seed } from './seed'
import { studentsTable } from './schema'

const connectionString = DATABASE_URL
if (!connectionString) throw new Error("db url missing. ")

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(connectionString, { prepare: false })
export const db = drizzle(client);

await seed();
