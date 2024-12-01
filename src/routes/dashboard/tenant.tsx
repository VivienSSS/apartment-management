import { createAsync } from "@solidjs/router";
import { Component, createSignal } from "solid-js";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import Input from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  NumberField,
  NumberFieldDecrementTrigger,
  NumberFieldErrorMessage,
  NumberFieldGroup,
  NumberFieldIncrementTrigger,
  NumberFieldInput,
} from "~/components/ui/number-field";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { getAllTenants, insertTenant } from "~/lib/db/action/tenant";

const TenantPage: Component<{}> = (props) => {
  const [rawValue, setRawValue] = createSignal<number>();
  const tenants = createAsync(() => getAllTenants());
  return (
    <article>
      <Dialog>
        <DialogTrigger>
          <Button>Create tenant</Button>
        </DialogTrigger>
        <DialogContent class="max-w-7xl">
          <DialogHeader>
            <DialogTitle>Create tenant</DialogTitle>
            <DialogDescription>
              Fill the required information below
            </DialogDescription>
          </DialogHeader>
          <form action={insertTenant} class="space-y-5" method="post">
            <div>
              <Label>
                Email
              </Label>
              <Input name="email" placeholder="marie@gmail.com" />
            </div>
            <div class="grid grid-cols-3 gap-5">
              <div>
                <Label>
                  First name
                </Label>
                <Input name="firstname" placeholder="Marie" />
              </div>
              <div>
                <Label>
                  Middle name
                </Label>
                <Input name="middlename" placeholder="P. or Perez" />
              </div>
              <div>
                <Label>
                  Last name
                </Label>
                <Input name="lastname" placeholder="Alvarez" />
              </div>
            </div>
            <div>
              <Label>
                Age
              </Label>
              <NumberField
                class="flex flex-col w-36 gap-2"
                defaultValue={21}
                onRawValueChange={setRawValue}
                validationState={rawValue()! < 21 ? "invalid" : "valid"}
              >
                <NumberFieldGroup>
                  <NumberFieldInput name="age" placeholder="21 and above" />
                  <NumberFieldIncrementTrigger />
                  <NumberFieldDecrementTrigger />
                </NumberFieldGroup>
                <NumberFieldErrorMessage>
                  Hmm, I prefer 21.
                </NumberFieldErrorMessage>
              </NumberField>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button type="submit" variant="default">Create</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>email</TableHead>
            <TableHead>firstname</TableHead>
            <TableHead>lastname</TableHead>
            <TableHead>middlename</TableHead>
            <TableHead>role</TableHead>
            <TableHead>age</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tenants()?.items.map((tenant) => (
            <TableRow>
              <TableCell>{tenant.email}</TableCell>
              <TableCell>{tenant.firstname}</TableCell>
              <TableCell>{tenant.lastname}</TableCell>
              <TableCell>{tenant.middlename}</TableCell>
              <TableCell>{tenant.role}</TableCell>
              <TableCell>{tenant.age}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
    </article>
  );
};

export default TenantPage;
