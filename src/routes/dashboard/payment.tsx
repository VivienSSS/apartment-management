import { HandCoins, PlusCircle, Wallet } from "lucide-solid";
import { Component, createSignal, For, Show } from "solid-js";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import Input from "~/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import { createAsync } from "@solidjs/router";
import {
  getAllRentPayment,
  getAllTransactions,
  insertBillingPayment,
  insertTransaction,
} from "~/lib/db/action/payment";
import { getAllTenants } from "~/lib/db/action/tenant";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { getAllRooms } from "~/lib/db/action/rooms";
import { Toggle } from "~/components/ui/toggle";

const PaymentPage: Component<{}> = (props) => {
  const billingInfo = createAsync(() => getAllRentPayment());
  const tenants = createAsync(() => getAllTenants());
  const rooms = createAsync(() => getAllRooms());
  const transactions = createAsync(() => getAllTransactions());
  const [tenantName, setTenantName] = createSignal<string>("");
  const [roomName, setRoomName] = createSignal<string>("");
  const [currentPaymentMethod, setCurrentPaymentMethod] = createSignal<
    string
  >();

  return (
    <article class="space-y-5">
      <h2 class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Payments
      </h2>
      <div class="flex flex-row justify-end gap-2.5">
        <Dialog>
          <DialogTrigger class="">
            <Button>Create Bill</Button>
          </DialogTrigger>
          <DialogContent class="max-w-2x2">
            <DialogHeader>
              <DialogTitle>Create Bill</DialogTitle>
              <DialogDescription>
                Add tenants and specify their payment details
              </DialogDescription>
            </DialogHeader>
            <form class="space-y-3" action={insertBillingPayment} method="post">
              <div>
                <span class="small">Tenant</span>
                <Show when={tenantName() !== undefined}>
                  <Select
                    value={tenantName()}
                    onChange={setTenantName}
                    options={tenants()?.items.map((val) =>
                      `${val.firstname} ${val.middlename} ${val.lastname}`
                    ) as string[]}
                    itemComponent={(props) => (
                      <SelectItem item={props.item}>
                        {props.item.textValue}
                      </SelectItem>
                    )}
                  >
                    <SelectTrigger>
                      <SelectValue<string>>
                        {(state) => state.selectedOption()}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent />
                  </Select>
                </Show>
                {tenantName() && (
                  <input
                    type="hidden"
                    name="tenant"
                    value={tenants()?.items.map(
                      (val) => {
                        if (
                          tenantName()?.includes(
                            `${val.firstname} ${val.middlename} ${val.lastname}`,
                          )
                        ) {
                          return val.id;
                        }
                      },
                    ).filter(Boolean)[0]}
                  />
                )}
              </div>
              <div>
                <span class="small">Room</span>
                <Show when={roomName() !== undefined}>
                  <Select
                    value={roomName()}
                    onChange={setRoomName}
                    options={rooms()?.items.map((val) =>
                      val.unit_name
                    ) as string[]}
                    itemComponent={(props) => (
                      <SelectItem item={props.item}>
                        {props.item.textValue}
                      </SelectItem>
                    )}
                  >
                    <SelectTrigger>
                      <SelectValue<string>>
                        {(state) => state.selectedOption()}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent />
                  </Select>
                </Show>
                {roomName() && (
                  <input
                    type="hidden"
                    name="room"
                    value={rooms()?.items.map((val) => {
                      if (roomName()?.includes(val.unit_name)) return val.id;
                    }).filter(Boolean)[0]}
                  />
                )}
              </div>
              <div>
                <span class="small">Electricity</span>
                <div class="grid grid-cols-3 gap-2.5">
                  <div>
                    <Label>
                      Total
                    </Label>
                    <Input type="number" name="electricity-bill" />
                  </div>
                  <div>
                    <Label>
                      From
                    </Label>
                    <Input type="date" name="electricity-deadline-from" />
                  </div>
                  <div>
                    <Label>
                      To
                    </Label>
                    <Input type="date" name="electricity-deadline-to" />
                  </div>
                </div>
              </div>
              <div>
                <span class="small">Water</span>
                <div class="grid grid-cols-3 gap-2.5">
                  <div>
                    <Label>
                      Total
                    </Label>
                    <Input type="number" name="water-bill" />
                  </div>
                  <div>
                    <Label>
                      From
                    </Label>
                    <Input type="date" name="water-deadline-from" />
                  </div>
                  <div>
                    <Label>
                      To
                    </Label>
                    <Input type="date" name="water-deadline-to" />
                  </div>
                </div>
              </div>
              <div>
                <Label>
                  Deadline
                </Label>
                <Input type="date" name="deadline" />
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  onClick={() => window.location.href = "/dashboard/payment"}
                  variant="default"
                >
                  Create
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger class="">
            <Button>Create Transaction</Button>
          </DialogTrigger>
          <DialogContent class="max-w-2x2">
            <DialogHeader>
              <DialogTitle>Create Trasaction</DialogTitle>
              <DialogDescription>
                Add tenants and specify their payment details
              </DialogDescription>
            </DialogHeader>
            <form class="space-y-3" action={insertTransaction} method="post">
              <div>
                <span class="small">Payment method</span>
                <ToggleGroup class="flex justify-start">
                  <ToggleGroupItem
                    name="payment-method"
                    onClick={() => setCurrentPaymentMethod("cash")}
                    value="cash"
                    class="flex flex-row gap-2.5"
                  >
                    <HandCoins size={16} /> CASH
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="gcash"
                    name="payment-method"
                    onClick={() => setCurrentPaymentMethod("gcash")}
                    class="flex flex-row gap-2.5"
                  >
                    <Wallet size={16} /> G-CASH
                  </ToggleGroupItem>
                </ToggleGroup>
                {currentPaymentMethod() && (
                  <input
                    type="hidden"
                    name="payment-method"
                    value={currentPaymentMethod()}
                  />
                )}
              </div>
              <div>
                <span class="small">Tenant</span>
                <Show when={tenantName() !== undefined}>
                  <Select
                    value={tenantName()}
                    onChange={setTenantName}
                    options={tenants()?.items.map((val) =>
                      `${val.firstname} ${val.middlename} ${val.lastname}`
                    ) as string[]}
                    itemComponent={(props) => (
                      <SelectItem item={props.item}>
                        {props.item.textValue}
                      </SelectItem>
                    )}
                  >
                    <SelectTrigger>
                      <SelectValue<string>>
                        {(state) => state.selectedOption()}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent />
                  </Select>
                </Show>
                {tenantName() && (
                  <input
                    type="hidden"
                    name="tenant"
                    value={tenants()?.items.map(
                      (val) => {
                        if (
                          tenantName()?.includes(
                            `${val.firstname} ${val.middlename} ${val.lastname}`,
                          )
                        ) {
                          return val.id;
                        }
                      },
                    ).filter(Boolean)[0]}
                  />
                )}
              </div>
              <div>
                <span class="small">Room</span>
                <Show when={roomName() !== undefined}>
                  <Select
                    value={roomName()}
                    onChange={setRoomName}
                    options={rooms()?.items.map((val) =>
                      val.unit_name
                    ) as string[]}
                    itemComponent={(props) => (
                      <SelectItem item={props.item}>
                        {props.item.textValue}
                      </SelectItem>
                    )}
                  >
                    <SelectTrigger>
                      <SelectValue<string>>
                        {(state) => state.selectedOption()}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent />
                  </Select>
                </Show>
                {roomName() && (
                  <input
                    type="hidden"
                    name="room"
                    value={rooms()?.items.map((val) => {
                      if (roomName()?.includes(val.unit_name)) return val.id;
                    }).filter(Boolean)[0]}
                  />
                )}
              </div>
              <div>
                <Label>
                  Description
                </Label>
                <Input type="text" name="description" />
              </div>
              <div>
                <Label>
                  Amount
                </Label>
                <Input type="text" name="amount" />
              </div>
              <DialogFooter>
                <Button
                  onClick={() => {
                    window.location.href = "/dashboard/payment";
                  }}
                  type="submit"
                  variant="default"
                >
                  Create
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Tabs>
        <TabsList class="w-full flex justify-start">
          <TabsTrigger value="rentPayment">Rent payment</TabsTrigger>
          <TabsTrigger value="utilityPayment">Utility payment</TabsTrigger>
          <TabsTrigger value="paymentSchedule">Payment Schedule</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>
        <TabsContent value="rentPayment" class="space-y-5 pt-5">
          <Table class="border space-y-2">
            <TableHeader>
              <TableRow>
                <TableHead>Room Name</TableHead>
                <TableHead>Tenant Email / Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Deadline</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <For each={billingInfo()}>
                {(bill) => (
                  <TableRow>
                    <TableCell>
                      {bill.expand?.billing_info.expand?.room_info?.unit_name}
                    </TableCell>
                    <TableCell>
                      {bill.expand?.to_user?.fb_name ||
                        bill.expand?.to_user?.email}
                    </TableCell>
                    <TableCell>
                      {bill.expand?.billing_info.expand?.room_info?.price}
                    </TableCell>
                    <TableCell>{bill.deadline}</TableCell>
                  </TableRow>
                )}
              </For>
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="utilityPayment">
          <Table class="border space-y-2">
            <TableHeader>
              <TableRow>
                <TableHead>Room Name</TableHead>
                <TableHead>Tenant Email / Name</TableHead>
                <TableHead>Utility Type</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {billingInfo()?.map((bill) => {
                return (
                  <For each={bill.expand?.billing_info.expand?.utilities}>
                    {(utility) => {
                      return (
                        <TableRow>
                          <TableCell>
                            {bill.expand?.billing_info.expand?.room_info
                              ?.unit_name}
                          </TableCell>
                          <TableCell>
                            {bill.expand?.to_user?.fb_name ||
                              bill.expand?.to_user?.email}
                          </TableCell>
                          <TableCell>{utility.utility_type}</TableCell>
                          <TableCell>{utility.from}</TableCell>
                          <TableCell>{utility.to}</TableCell>
                          <TableCell>{utility.total}</TableCell>
                        </TableRow>
                      );
                    }}
                  </For>
                );
              })}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="paymentSchedule">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Room Name</TableHead>
                <TableHead>Tenant Email / Name</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead>Total Bill</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {billingInfo()?.map((bill) => {
                let utilityTotal = bill.expand?.billing_info.expand?.utilities
                  .map((
                    v,
                  ) => v.total).reduce((a, b) => a + b, 0) as number;
                const rentPrice =
                  bill.expand?.billing_info.expand?.room_info?.price || 0;
                let total = utilityTotal + rentPrice;
                return (
                  <TableRow>
                    <TableCell>
                      {bill.expand?.billing_info.expand?.room_info?.unit_name}
                    </TableCell>
                    <TableCell>
                      {bill.expand?.to_user?.fb_name ||
                        bill.expand?.to_user?.email}
                    </TableCell>
                    <TableCell>{bill.deadline}</TableCell>
                    <TableCell>{total}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="transactions">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Room Name</TableHead>
                <TableHead>Tenant Email / Name</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <For each={transactions()}>
                {(transaction) => (
                  <TableRow>
                    <TableCell>
                      {transaction.expand?.room.unit_name}
                    </TableCell>
                    <TableCell>
                      {transaction.expand?.tenant?.fb_name ||
                        transaction.expand?.tenant?.email}
                    </TableCell>
                    <TableCell>{transaction.payment_method}</TableCell>
                    <TableCell>{transaction.amount}</TableCell>
                  </TableRow>
                )}
              </For>
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </article>
  );
};

export default PaymentPage;
