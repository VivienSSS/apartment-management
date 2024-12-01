import { query } from "@solidjs/router";
import Pocketbase from "pocketbase";
import { useSession } from "vinxi/http";
import { config } from "~/config";
import { TypedPocketBase, UsersRecord } from "~/lib/pocketbase-types";

export const getCurrentLandlordInfo = query(async () => {
    "use server";
    // get the current landlord info

    const session = await useSession({
        password: config.credentials.sessionPassword,
    });

    const { token, record } = session.data as {
        token: string;
        record: UsersRecord;
    };
    return { token, record };
}, "getCurrentLandlordInfo");
