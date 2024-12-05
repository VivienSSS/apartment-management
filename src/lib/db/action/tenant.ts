import { action, query, redirect } from "@solidjs/router";
import {
    TypedPocketBase,
    UsersRecord,
    UsersResponse,
} from "~/lib/pocketbase-types";
import Pocketbase, { ListResult, RecordModel } from "pocketbase";
import { useSession } from "vinxi/http";
import { config } from "~/config";

export const insertTenant = action(async (form: FormData): Promise<void> => {
    "use server";
    const tenant = {
        email: form.get("email") as string,
        firstname: form.get("firstname") as string,
        middlename: form.get("middlename") as string,
        lastname: form.get("lastname") as string,
        age: form.get("age") as string,
        fb_name: form.get("fb_name") as string,
        contact_number: form.get("contact_number") as string,
        password: "asfdhjkasfdkjhjfahwef",
        passwordConfirm: "asfdhjkasfdkjhjfahwef",
        role: "tenant",
        emailVisibility: true,
    };

    const session = await useSession({
        password: config.credentials.sessionPassword,
    });

    const { token, record } = session.data as {
        token: string;
        record: RecordModel;
    };

    const pb = new Pocketbase(process.env.POCKETBASE_URL) as TypedPocketBase;

    pb.authStore.save(token, record);
    try {
        const response = await pb.collection("users").create(tenant);
        throw redirect("/dashboard/tenant");
    } catch (error) {
        console.error(error);
    }
    return;
});

export const getAllTenants = query(
    async (): Promise<ListResult<UsersResponse> | undefined> => {
        "use server";
        const pb = new Pocketbase(
            process.env.POCKETBASE_URL,
        ) as TypedPocketBase;
        const session = await useSession({
            password: config.credentials.sessionPassword,
        });

        const { token } = session.data as {
            token: string;
        };

        pb.authStore.save(token, session.data.record);
        try {
            const tenants = await pb.collection("users").getList(1, 50, {
                filter: "role='tenant'",
            });
            return tenants;
        } catch (error) {
            console.error(error);
        }
    },
    "getAllTenants",
);
