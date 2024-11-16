import type { DB, UsersTable } from "kysely-codegen";
import { Insertable, Kysely } from "kysely";

export async function createUser(
    db: Kysely<DB>,
    userData: Insertable<UsersTable>,
) {
    return await db.insertInto("users_table").values(userData).execute();
}

export async function listAllUsers(
    db: Kysely<DB>,
) {
    return await db.selectFrom("users_table").selectAll().execute();
}

export async function findUserByEmail(db: Kysely<DB>, email: string) {
    return await db.selectFrom("users_table").selectAll().where(
        "email",
        "=",
        email,
    )
        .executeTakeFirst();
}

export async function updatePassword(
    db: Kysely<DB>,
    email: string,
    oldPassword: string,
    newPassword: string,
) {
    return await db.updateTable("users_table").set("password", newPassword)
        .where("email", "=", email).where("password", "=", oldPassword)
        .execute();
}

export async function deleteUser(
    db: Kysely<DB>,
    email: string,
) {
    return await db.deleteFrom("users_table").where("email", "=", email)
        .execute();
}
