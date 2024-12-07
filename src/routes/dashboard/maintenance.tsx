import { createAsync, Navigate } from "@solidjs/router";
import {
  batch,
  Component,
  createEffect,
  createMemo,
  createSignal,
  For,
  onMount,
  Show,
} from "solid-js";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  getAllMaintenanceSchedule,
  insertMaintenanceSchedule,
} from "~/lib/db/action/maintenance";
import { getAllRooms } from "~/lib/db/action/rooms";
import { getAllTenants } from "~/lib/db/action/tenant";
import { UsersResponse } from "~/lib/pocketbase-types";

const MaintenancePage: Component<{}> = (props) => {
  const schedules = createAsync(() => getAllMaintenanceSchedule());
  const rooms = createAsync(() => getAllRooms());
  const tenants = createAsync(() => getAllTenants());
  const [tenant, setTenant] = createSignal<string>();
  const [purpose, setPurpose] = createSignal<string>();
  const [room, setRoom] = createSignal<string>();

  onMount(() => {
  });

  return (
    <article class="space-y-5">
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
            <form
              action={insertMaintenanceSchedule}
              class="space-y-5"
              method="post"
            >
              <div>
                <Label>
                  Purpose
                </Label>
                <Select
                  value={purpose()}
                  onChange={setPurpose}
                  options={["maintenance", "reservation"]}
                  placeholder="Select a purpose"
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
                <input
                  class="hidden"
                  type="text"
                  name="purpose"
                  value={purpose()}
                />
              </div>
              <div>
                <Label>
                  Maintenance price
                </Label>
                <Input
                  type="number"
                  name="maintenance_price"
                  placeholder="1000"
                />
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
                <Input
                  type="text"
                  name="description"
                  placeholder="Add a description"
                />
              </div>
              <div>
                <Label>
                  Tenant
                </Label>
                <Select
                  value={tenant()}
                  onChange={setTenant}
                  options={tenants()?.items.map((val) =>
                    `${val.firstname} ${val.middlename} ${val.lastname}`
                  ) as string[]}
                  placeholder="Select a tenant"
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
                <input
                  type="text"
                  name="tenant_id"
                  class="hidden"
                  value={tenants()?.items.map(
                    (val) => {
                      if (
                        tenant()?.includes(
                          `${val.firstname} ${val.middlename} ${val.lastname}`,
                        )
                      ) {
                        return val.id;
                      }
                    },
                  ).filter(Boolean)[0]}
                />
              </div>
              <div>
                <Label>
                  Room
                </Label>
                <Select
                  value={room()}
                  onChange={setRoom}
                  onInput={(e: InputEvent) => {
                    setRoom((e.target as HTMLInputElement).value);
                  }}
                  options={rooms()?.items.map((val) =>
                    val.unit_name
                  ) as string[]}
                  placeholder="Select a room"
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
                <input
                  class="hidden"
                  type="text"
                  name="room_id"
                  value={rooms()?.items.map(
                    (val) => {
                      if (room() === val.unit_name) {
                        return val.id;
                      }
                    },
                  ).filter(Boolean)[0]}
                />
              </div>
              <DialogFooter>
                <Button
                  onClick={() => {
                    window.location.href = "/dashboard/maintenance";
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
          <For
            each={schedules()?.items}
            fallback={
              <TableRow>
                <TableCell colSpan={6}>
                  No schedules found
                </TableCell>
              </TableRow>
            }
          >
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
                  {schedule.expand?.user.firstname}{" "}
                  {schedule.expand?.user.middlename}{" "}
                  {schedule.expand?.user.lastname}
                </TableCell>
                <TableCell>
                  {schedule.expand?.room.unit_name}
                </TableCell>
              </TableRow>
            )}
          </For>
        </TableBody>
      </Table>
    </article>
  );
};

export default MaintenancePage;
