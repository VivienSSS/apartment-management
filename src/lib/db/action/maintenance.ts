import { action, query } from "@solidjs/router";
import Pocketbase from "pocketbase";
import { ScheduleTblResponse, TypedPocketBase } from "~/lib/pocketbase-types";
import { useSession } from "vinxi/http";
import { config } from "~/config";

export const getAllMaintenanceSchedule = query(
    async () => {
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
            const schedules = await pb.collection("schedule_tbl").getList<
                ScheduleTblResponse
            >(1, 50);
            return schedules;
        } catch (error) {
            console.error(error);
        }
    },
    "getAllMaintenanceSchedule",
);

export const insertMaintenanceSchedule = action(
    async (formData: FormData): Promise<void> => {
        "use server";
        const newSchedule = {
            purpose: formData.get("purpose") as string,
            maintenance_price: formData.get("maintenance_price") as string,
            scheduled_date: formData.get("scheduled_date") as string,
            description: formData.get("description") as string,
            user: formData.get("tenant_id") as string,
            room: formData.get("room_id") as string,
        };
        console.log(newSchedule);
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
            const response = await pb.collection("schedule_tbl").create(
                newSchedule,
            );
        } catch (error) {
            console.error(error);
        }
        return;
    },
);
