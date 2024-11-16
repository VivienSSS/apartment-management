import { faker } from "@faker-js/faker";
import { Insertable, Kysely } from "kysely";
import { DB, UsersTable } from "kysely-codegen";
import {
    createUser,
    deleteUser,
    findUserByEmail,
    listAllUsers,
    updatePassword,
} from "./user";
import { migrateToLatest } from "~/lib/db/utils";
import { Database } from "bun:sqlite";
import { expect, test } from "bun:test";
import { BunSqliteDialect } from "kysely-bun-sqlite";

test("create a user", async () => {
    faker.seed(11);

    const dialect = new BunSqliteDialect({
        database: new Database(":memory:"),
    });

    const db = new Kysely<DB>({ dialect });

    await migrateToLatest(db, `./migrations`);

    const user: Insertable<UsersTable> = {
        email: faker.internet.email(), // Dorothy Reilly
        password: faker.internet.password(), // Ozqfur00inAdYNG
    };

    await createUser(db, user);
    const result = await db.selectFrom(["users_table"]).selectAll()
        .executeTakeFirst();

    expect(result?.email).toBe("Aimee.Reilly48@gmail.com");
    expect(result?.password).toBe("Ozqfur00inAdYNG");
});

test("list all user", async () => {
    faker.seed(11);

    const dialect = new BunSqliteDialect({
        database: new Database(":memory:"),
    });

    const db = new Kysely<DB>({ dialect });

    await migrateToLatest(db, `./migrations`);

    const user: Insertable<UsersTable> = {
        email: faker.internet.email(), // Dorothy Reilly
        password: faker.internet.password(), // Ozqfur00inAdYNG
    };

    await createUser(db, user);

    const users = await listAllUsers(db);

    expect(users.length).toBe(1);
});

test("find user by email", async () => {
    faker.seed(11);

    const dialect = new BunSqliteDialect({
        database: new Database(":memory:"),
    });

    const db = new Kysely<DB>({ dialect });

    await migrateToLatest(db, `./migrations`);

    const user: Insertable<UsersTable> = {
        email: faker.internet.email(), // Aimee.Reilly48@gmail.com
        password: faker.internet.password(), // Ozqfur00inAdYNG
    };

    await createUser(db, user);

    const result = await findUserByEmail(db, "Aimee.Reilly48@gmail.com");

    expect(result?.email).toBe("Aimee.Reilly48@gmail.com");
});

test("update user password", async () => {
    faker.seed(11);

    const dialect = new BunSqliteDialect({
        database: new Database(":memory:"),
    });

    const db = new Kysely<DB>({ dialect });

    await migrateToLatest(db, `./migrations`);

    const user: Insertable<UsersTable> = {
        email: faker.internet.email(), // Aimee.Reilly48@gmail.com
        password: faker.internet.password(), // Ozqfur00inAdYNG
    };

    await createUser(db, user);

    const newPassword = faker.internet.password();

    await updatePassword(
        db,
        "Aimee.Reilly48@gmail.com",
        "Ozqfur00inAdYNG",
        newPassword,
    );

    const result = await findUserByEmail(db, "Aimee.Reilly48@gmail.com");
    expect(result?.password).toBe(newPassword);
});

test("delete user by email", async () => {
    faker.seed(11);

    const dialect = new BunSqliteDialect({
        database: new Database(":memory:"),
    });

    const db = new Kysely<DB>({ dialect });

    await migrateToLatest(db, `./migrations`);

    const user: Insertable<UsersTable> = {
        email: faker.internet.email(), // Aimee.Reilly48@gmail.com
        password: faker.internet.password(), // Ozqfur00inAdYNG
    };

    await createUser(db, user);

    await deleteUser(db, "Aimee.Reilly48@gmail.com");

    const result = await findUserByEmail(db, "Aimee.Reilly48@gmail.com");

    expect(result).toBeUndefined();
});
