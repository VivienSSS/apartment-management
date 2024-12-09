import { action, query } from "@solidjs/router";
import {
    BillingInfoUtilitiesDateTblRecord,
    BillingTblResponse,
    RoomsTblRecord,
    TransactionTblResponse,
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

export const insertBillingPayment = action(async (form: FormData) => {
    "use server";

    // send utility payment and get their id
    const pb = await getPocketbase();

    const electricityBill = {
        total: form.get("electricity-bill"),
        from: form.get("electricity-deadline-from"),
        to: form.get("electricity-deadline-to"),
        utility_type: "electricity",
    };

    const roomID = form.get("room");
    const tenantID = form.get("tenant");

    const waterBill = {
        total: form.get("water-bill"),
        from: form.get("water-deadline-from"),
        to: form.get("water-deadline-to"),
        utility_type: "water",
    };

    const dbElectricityBill = await pb.collection(
        "billing_info_utilities_date_tbl",
    ).create(electricityBill);
    const dbWaterBill = await pb.collection("billing_info_utilities_date_tbl")
        .create(waterBill);

    const billingInfo = await pb.collection("billing_info_tbl").create({
        room_info: roomID,
        utilities: [dbElectricityBill.id, dbWaterBill.id],
    });

    await pb.collection("billing_tbl").create({
        deadline: form.get("deadline"),
        billing_info: billingInfo.id,
        to_user: tenantID,
    });
});

export const getAllTransactions = query(async () => {
    "use server";

    const pb = await getPocketbase();

    try {
        return await pb.collection("transaction_tbl").getFullList<
            TransactionTblResponse<{
                tenant: UsersRecord;
                room: RoomsTblRecord;
            }>
        >({
            expand: "tenant,room",
        });
    } catch (error) {
        console.error(error);
    }
}, "getAllTransactions");

export const insertTransaction = action(async (form: FormData) => {
    "use server";

    const payload = {
        tenant: form.get("tenant"),
        room: form.get("room"),
        amount: form.get("amount"),
        description: form.get("description"),
        payment_method: form.get("payment-method"),
    };

    const pb = await getPocketbase();

    try {
        console.log(payload);
        await pb.collection("transaction_tbl").create(payload);
    } catch (error) {
        console.error(error);
    }
});
