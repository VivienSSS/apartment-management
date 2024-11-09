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
import { getAllRooms } from "~/lib/db/action/rooms";
import Input from "~/components/ui/input";
import { Toggle } from "~/components/ui/toggle";
import {
  Switch,
  SwitchControl,
  SwitchLabel,
  SwitchThumb,
} from "~/components/ui/switch";

export const route = {
  preload: () => getAllRooms(),
};

const RoomsPage: Component<{}> = (props) => {
  const rooms = createAsync(() => getAllRooms());

  return (
    <div>
      <div class="flex flex-row items-center justify-between py-4">
        <h2 class="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Rooms
        </h2>
      </div>
      <div class="grid grid-cols-4 gap-2.5">
        <For each={rooms()}>
          {(room) => (
            <Card>
              <CardHeader>
                <CardTitle class="flex flex-row items-center gap-2.5">
                  <h4>Room {room.letter}</h4>
                  <Dot class="w-fit" size={16} />
                  <span class="text-sm text-muted-foreground">
                    {room.status}
                  </span>
                </CardTitle>
                <div class="flex flex-row items-center gap-2.5">
                  <PhilippinePeso size={16} />
                  <CardDescription class="scroll-m-20 text-xl font-semibold tracking-tight">
                    {room.rentAmount}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardFooter class="gap-2.5">
                <Tooltip>
                  <TooltipTrigger>
                    <Button variant={"default"} size={"sm"}>
                      <DoorOpen size={16} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Visit Room</TooltipContent>
                </Tooltip>
                <Dialog>
                  <DialogTrigger>
                    <Tooltip>
                      <TooltipTrigger>
                        <Button variant={"ghost"} size={"sm"}>
                          <Info size={16} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>More Info</TooltipContent>
                    </Tooltip>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{room.rentAmount}</DialogTitle>
                      <DialogDescription>{room.status}</DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          )}
        </For>
        <Dialog>
          <DialogTrigger class="h-full">
            <Card class="h-full flex flex-col justify-center items-center text-muted-foreground gap-2.5">
              <PlusCircle size={24} />
              Add Room
            </Card>
          </DialogTrigger>
          <DialogContent class="h-[90%] w-full">
            <form action="" class="space-y-2.5 py-4">
              <Input placeholder="name" />
              <Input placeholder="name" />
              <Switch class="flex items-center space-x-2">
                <SwitchLabel>Status</SwitchLabel>
                <SwitchControl>
                  <SwitchThumb />
                </SwitchControl>
              </Switch>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default RoomsPage;
