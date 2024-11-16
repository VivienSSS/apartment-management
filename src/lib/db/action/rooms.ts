import { action, query, revalidate } from "@solidjs/router";
import { Room } from "../schema/types";

export const insertRoom = action(async (): Promise<void> => {
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

export const getAllRooms = query(async (): Promise<Room[]> => {
    const data: Room[] = [];

    for (let i = 0; i < 5; i++) {
        data.push({
            id: 1312312312,
            letter: "A",
            floor: 2,
            status: "occupied",
            rentAmount: 10_000,
            buildingID: 1,
        });
    }
    return data;
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
