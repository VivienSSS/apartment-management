import { PlusCircle } from "lucide-solid";
import { Component } from "solid-js";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

const PaymentPage: Component<{}> = (props) => {
  return (
    <div class="grid grid-cols-3 gap-2.5">
      <Card>
        <CardHeader>
          <CardTitle>Rent Payment</CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Utility Payment</CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Maintenace Payment</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
};

export default PaymentPage;
