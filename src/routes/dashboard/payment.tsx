import { PlusCircle } from "lucide-solid";
import { Component } from "solid-js";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

const PaymentPage: Component<{}> = (props) => {
  return (
    <article class="space-y-5">
      <h2 class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">Payments</h2>
      <Tabs>
        <TabsList class="w-full flex justify-start">
          <TabsTrigger value="rentPayment">Rent payment</TabsTrigger>
          <TabsTrigger value="utilityPayment">Utility payment</TabsTrigger>
          <TabsTrigger value="maintenancePayment">
            Maintenance payment
          </TabsTrigger>
        </TabsList>
        <TabsContent value="rentPayment">Rent payment</TabsContent>
        <TabsContent value="utilityPayment">Utility Payment</TabsContent>
        <TabsContent value="maintenancePayment">Maintenance Payment</TabsContent>
      </Tabs>
    </article>
  );
};

export default PaymentPage;
