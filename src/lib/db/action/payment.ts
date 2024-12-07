import { query } from "@solidjs/router";
import {
    BillingInfoUtilitiesDateTblRecord,
    BillingTblResponse,
    RoomsTblRecord,
    UsersRecord,
} from "~/lib/pocketbase-types";
import { getPocketbase } from "~/lib/utils";

export const getAllRentPayment = query(async () => {
    "use server";
    const pb = await getPocketbase();
    try {
        return await pb.collection("billing_tbl").getFullList<
            BillingTblResponse<{
                to_user: UsersRecord;
                billing_info: {
                    expand?: {
                        room_info: RoomsTblRecord;
                        utilities: BillingInfoUtilitiesDateTblRecord[];
                    };
                };
            }>
        >({
            expand:
                "to_user,billing_info,billing_info.room_info,billing_info.utilities",
        });
    } catch (error) {
        console.error(error);
    }
}, "getAllRentPayment");
