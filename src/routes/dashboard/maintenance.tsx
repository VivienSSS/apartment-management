import { createAsync } from "@solidjs/router";
import { Component, For } from "solid-js";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import Input from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { getAllMaintenanceSchedule, insertMaintenanceSchedule } from "~/lib/db/action/maintenance";

const MaintenancePage: Component<{}> = (props) => {

  const schedules = createAsync(() => getAllMaintenanceSchedule());

  return <article class="space-y-5">
    <h2 class="border-b scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      Maintenance Schedules
    </h2>
    <div class="flex flex-row justify-end">
      <Dialog>
        <DialogTrigger class="">
          <Button>Add Schedule</Button>
        </DialogTrigger>
        <DialogContent class="max-w-7xl">
          <DialogHeader>
            <DialogTitle>Create Maintenance Schedule</DialogTitle>
            <DialogDescription>
              Fill the required information below
            </DialogDescription>
          </DialogHeader>
          <form action={insertMaintenanceSchedule} class="space-y-5" method="post">
            <div>
              <Label>
                Purpose
              </Label>
              <Input type="text" name="purpose" placeholder="Maintenance or schedule" />
            </div>
            <div>
              <Label>
                Maintenance price
              </Label>
              <Input type="number" name="maintenance_price" placeholder="1000" />
            </div>
            <div> 
              <Label>
                Scheduled date
              </Label>
              <Input type="date" name="scheduled_date" placeholder="" />
            </div>
            <div>
              <Label>
                Description
              </Label>
              <Input type="text" name="description" placeholder="Add a description" />
            </div>
            <div>
              <Label>
                Tenant ID
              </Label>
              <Input type="text" name="tenant_id" placeholder="ex. xh2n1sxc" />
            </div>
            <div>
              <Label>
                Room ID
              </Label>
              <Input type="text" name="room_id" placeholder="ex. xh2n1sxc" />
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button type="submit" variant="default">Create</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
    <Table class="border">
      <TableHeader>
        <TableRow>
          <TableHead>
            Purpose
          </TableHead>
          <TableHead>
            Maintenance price
          </TableHead>
          <TableHead> 
            Scheduled date
          </TableHead>
          <TableHead>
            Description
          </TableHead>
          <TableHead>
            Tenant
          </TableHead>
          <TableHead>
            Room
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <For each={schedules()?.items} fallback={
          <TableRow>
            <TableCell colSpan={6}>
              No schedules found
            </TableCell>
          </TableRow>
        }>
          {(schedule) => (
            <TableRow>
              <TableCell>
                {schedule.purpose}
              </TableCell>
              <TableCell>
                {schedule.maintenance_price}
              </TableCell>
              <TableCell>
                {schedule.scheduled_date}
              </TableCell>
              <TableCell>
                {schedule.description}
              </TableCell>
              <TableCell>
                {schedule.user}
              </TableCell>
              <TableCell>
                {schedule.room}
              </TableCell>
            </TableRow>
          )}
        </For>
      </TableBody>
    </Table>
  </article>;
};

export default MaintenancePage;
