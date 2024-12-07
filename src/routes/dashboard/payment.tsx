import { HandCoins, PlusCircle, Wallet } from "lucide-solid";
import { Component, For } from "solid-js";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCaption,
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
import { getAllRentPayment } from "~/lib/db/action/payment";

const PaymentPage: Component<{}> = (props) => {
  const billingInfo = createAsync(() => getAllRentPayment());

  return (
    <article class="space-y-5">
      <h2 class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Payments
      </h2>
      <Tabs>
        <TabsList class="w-full flex justify-start">
          <TabsTrigger value="rentPayment">Rent payment</TabsTrigger>
          <TabsTrigger value="utilityPayment">Utility payment</TabsTrigger>
          <TabsTrigger value="maintenancePayment">
            Maintenance payment
          </TabsTrigger>
        </TabsList>
        <TabsContent value="rentPayment" class="space-y-5 pt-5">
          <div class="flex flex-row justify-end">
            <Dialog>
              <DialogTrigger class="">
                <Button>Add Tenant</Button>
              </DialogTrigger>
              <DialogContent class="max-w-2x2">
                /*starting of the dialog content, big square*/
                <DialogHeader>
                  <DialogTitle>Add Tenant</DialogTitle>
                  <DialogDescription>
                    Add tenants and specify their payment details
                  </DialogDescription>
                </DialogHeader>
                <form class="space-y-3" method="post">
                  <div>
                    <Label>Payment method</Label>
                    <ToggleGroup>
                      <ToggleGroupItem value="a" class="flex flex-row gap-2.5">
                        <HandCoins size={16} /> CASH
                      </ToggleGroupItem>
                      <ToggleGroupItem value="b" class="flex flex-row gap-2.5">
                        <Wallet size={16} /> G-CASH
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </div>
                  <div>
                    <Label>Floor number</Label>
                    <Input
                      type="number"
                      name="floor_number"
                      placeholder="ex. 14"
                    />
                  </div>
                  <div>
                    <Label>Building number</Label>
                    <Input
                      type="number"
                      name="building_number"
                      placeholder="ex. 1"
                    />
                  </div>
                  <div class="grid grid-cols-2 gap-5">
                    <div>
                      <Label>Price</Label>
                      <Input type="number" name="price" placeholder="ex. 1" />
                    </div>
                    <div>
                      <Label>Capacity</Label>
                      <Input
                        type="number"
                        name="capacity"
                        placeholder="ex. 4"
                        min={1}
                        max={6}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" variant="default">Create</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          <Table class="border space-y-2">
            <TableHeader>
              <TableRow>
                <TableHead>Room Name</TableHead>
                <TableHead>Tenant Email</TableHead>
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
                <TableHead>Tenant Email</TableHead>
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
        <TabsContent value="maintenancePayment">
          Maintenance Payment
        </TabsContent>
      </Tabs>
    </article>
  );
};

export default PaymentPage;
