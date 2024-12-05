import { createAsync, redirect, useSubmission } from "@solidjs/router";
import { Component, createEffect, createSignal } from "solid-js";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { getAllTenants, insertTenant } from "~/lib/db/action/tenant";

const TenantPage: Component<{}> = (props) => {
  const [rawValue, setRawValue] = createSignal<number>();
  const insertTenantResult = useSubmission(insertTenant);
  const tenants = createAsync(() => getAllTenants());

  createEffect(() => {
    if (insertTenantResult.result !== undefined) {
      throw redirect("/dashboard/maintenance");
    }
  });

  return (
    <article class="space-y-5">
      <h2 class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Tenants
      </h2>
      <div class="flex flex-row justify-end">
        <Dialog>
          <DialogTrigger class="">
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
              <div>
                <Label>
                  Facebook name
                </Label>
                <Input name="fb_name" placeholder="Marie Alvarez" />
              </div>
              <div>
                <Label>
                  Contact number
                </Label>
                <Input name="contact_number" placeholder="+63901030204" />
              </div>
              <DialogFooter>
                <Button onClick={() => {
                  window.location.href = "/dashboard/tenant";
                }} type="submit" variant="default">Create</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Table class="border">
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>First name</TableHead>
            <TableHead>Middle name</TableHead>
            <TableHead>Last name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Facebook name</TableHead>
            <TableHead>Contact number</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tenants()?.items.map((tenant) => (
            <TableRow>
              <TableCell>{tenant.email}</TableCell>
              <TableCell>{tenant.firstname}</TableCell>
              <TableCell>{tenant.middlename}</TableCell>
              <TableCell>{tenant.lastname}</TableCell>
              <TableCell>{tenant.role}</TableCell>
              <TableCell>{tenant.age}</TableCell>
              <TableCell>{tenant.fb_name || "No info"}</TableCell>
              <TableCell>{tenant.contact_number || "No info"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </article>
  );
};

export default TenantPage;
