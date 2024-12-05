import { createAsync } from "@solidjs/router";
import {
  DoorOpen,
  Dot,
  Info,
  PhilippinePeso,
  Plus,
  PlusCircle,
} from "lucide-solid";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Component, For } from "solid-js";
import { Button } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { getAllRooms, insertRoom } from "~/lib/db/action/rooms";
import Input from "~/components/ui/input";
import { Toggle } from "~/components/ui/toggle";
import {
  Switch,
  SwitchControl,
  SwitchLabel,
  SwitchThumb,
} from "~/components/ui/switch";
import { Label } from "~/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";

export const route = {
  preload: () => getAllRooms(),
};

const RoomsPage: Component<{}> = (props) => {
  const rooms = createAsync(() => getAllRooms());
  return (
    <article class="space-y-5">
      <h2 class="border-b scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Rooms
      </h2>
      <div class="flex flex-row justify-end">
        <Dialog>
          <DialogTrigger class="">
            <Button>Add Room</Button>
          </DialogTrigger>
          <DialogContent class="max-w-7xl">
            <DialogHeader>
              <DialogTitle>Create room</DialogTitle>
              <DialogDescription>
                Fill the required information below
              </DialogDescription>
            </DialogHeader>
            <form action={insertRoom} class="space-y-5" method="post">
              <div>
                <Label>Unit name</Label>
                <Input type="text" name="unit_name" placeholder="ex. Unit A" />
              </div>
              <div>
                <Label>Floor number</Label>
                <Input type="number" name="floor_number" placeholder="ex. 14" />
              </div>
              <div>
                <Label>Building number</Label>
                <Input type="number" name="building_number" placeholder="ex. 1" />
              </div>
              <div class="grid grid-cols-2 gap-5">
                <div>
                  <Label>Price</Label>
                  <Input type="number" name="price" placeholder="ex. 1" />
                </div>
                <div>
                  <Label>Capacity</Label>
                  <Input type="number" name="capacity" placeholder="ex. 4" min={1} max={6} />
                </div>     
              </div>
              <DialogFooter>
                <Button type="submit" variant="default">Create</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Table class="border">
        <TableHeader>
          <TableRow>
            <TableHead>Unit name</TableHead>
            <TableHead>Floor number</TableHead>
            <TableHead>Building number</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Capacity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <For each={rooms()?.items} fallback={<div>Loading...</div>}>
            {(room) => (
              <TableRow>
                <TableCell>{room.unit_name}</TableCell>
                <TableCell>{room.floor_number}</TableCell>
                <TableCell>{room.bldg_number}</TableCell>
                <TableCell>{room.price}</TableCell>
                <TableCell>{room.capacity}</TableCell>
              </TableRow>
            )}
          </For>
        </TableBody>
      </Table>
    </article>
  );
};

export default RoomsPage;
