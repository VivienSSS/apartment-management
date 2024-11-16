import { DB } from "kysely-codegen";
import { FileMigrationProvider, Kysely, Migrator } from "kysely";
import * as path from "node:path";
import { promises as fs } from "node:fs";

export async function migrateToLatest(db: Kysely<any>, path_url: string) {
    const migrator = new Migrator({
        db,
        provider: new FileMigrationProvider({
            fs,
            path,
            // This needs to be an absolute path.
            migrationFolder: path.resolve(path_url),
        }),
    });

    const { error, results } = await migrator.migrateToLatest();
    results?.forEach((it) => {
        if (it.status === "Success") {
            console.log(
                `migration "${it.migrationName}" was executed successfully`,
            );
        } else if (it.status === "Error") {
            console.error(`failed to execute migration "${it.migrationName}"`);
        }
    });

    if (error) {
        console.error("failed to migrate");
        console.error(error);
        process.exit(1);
    }
}
