import { action, query, revalidate } from "@solidjs/router";
import { Room } from "../schema/types";
import Pocketbase from "pocketbase";
import { RoomsTblResponse, TypedPocketBase } from "~/lib/pocketbase-types";
import { useSession } from "vinxi/http";
import { config } from "~/config";

export const insertRoom = action(async (formData: FormData): Promise<void> => {
    "use server";
    const room = {
        unit_name: formData.get("unit_name") as string,
        floor_number: formData.get("floor_number") as string,
        bldg_number: formData.get("building_number") as string,
        price: formData.get("price") as string,
        capacity: formData.get("capacity") as string,
    };

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
        const response = await pb.collection("rooms_tbl").create(room);
    } catch (error) {
        console.error(error);
    }
    return;
});

export const findRoom = query(async (form: FormData): Promise<Room> => {
    const byID = form.get("roomId");

    return {
        id: 1312312312,
        letter: "A",
        floor: 2,
        status: "occupied",
        rentAmount: 10_000,
        buildingID: 1,
    };
}, "findRoom");

export const getAllRooms = query(async () => {
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
        const rooms = await pb.collection("rooms_tbl").getList<
            RoomsTblResponse
        >(1, 50, {
            sort: "unit_name",
        });
        return rooms;
    } catch (error) {
        console.error(error);
    }
}, "getAllRoom");

export const updateRoom = action(async (form: FormData): Promise<Room> => {
    return {
        id: 1312312312,
        letter: "A",
        floor: 2,
        status: "occupied",
        rentAmount: 10_000,
        buildingID: 1,
    };
});

export const deleteRoom = action(async (form: FormData): Promise<void> => {
    return;
});
