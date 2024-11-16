import type { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema.createTable("users_table")
		.addColumn("id", "integer", (col) => col.primaryKey().autoIncrement())
		.addColumn("email", "text", (col) => col.notNull().unique())
		.addColumn("password", "text", (col) => col.notNull())
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropTable("users_table")
		.execute();
}
