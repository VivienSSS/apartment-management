import { defineConfig } from "kysely-ctl";
import process from "node:process";
import { Database } from "bun:sqlite";
import { BunSqliteDialect } from "kysely-bun-sqlite";

export default defineConfig({
    dialect: new BunSqliteDialect({
        database: new Database(process.env.DATABASE_URL!),
    }),
    migrations: {
        migrationFolder: "migrations",
    },
});
