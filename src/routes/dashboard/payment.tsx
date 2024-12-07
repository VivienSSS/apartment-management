import { HandCoins, PlusCircle, Wallet } from "lucide-solid";
import { Component } from "solid-js";
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

const PaymentPage: Component<{}> = (props) => {
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
                <TableHead>Total</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Utility type</TableHead>
                <TableHead>Room ID</TableHead>
              </TableRow>
            </TableHeader>
          </Table>
        </TabsContent>
        <TabsContent value="utilityPayment">Utility Payment</TabsContent>
        <TabsContent value="maintenancePayment">
          Maintenance Payment
        </TabsContent>
      </Tabs>
    </article>
  );
};

export default PaymentPage;
