import { A, createAsync, RouteSectionProps } from "@solidjs/router";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import Input from "~/components/ui/input";
import { Separator } from "~/components/ui/separator";
import { logout, validateUser } from "~/lib/utils";
import {
  Bed,
  Bell,
  CircleGauge,
  Hammer,
  Home,
  LogOut,
  PhilippinePeso,
  ScrollText,
  Star,
} from "lucide-solid";
import { getCurrentLandlordInfo } from "~/lib/db/action/landlord";
import { Show } from "solid-js";

export const route = {
  preload: () => validateUser(),
};

const DashboardLayout = (props: RouteSectionProps) => {

  const landlordInfo = createAsync(() => getCurrentLandlordInfo());

  return (
    <main class="h-screen max-h-screen grid grid-cols-12 max-w-[1920px] container mx-auto">
      <aside class="col-span-2 p-4 border-r border-border flex flex-col justify-between">
        <div class="space-y-5">
          <h2 class="scroll-m-20 text-2xl font-semibold tracking-tight">
          </h2>
          <nav>
            <ul class="space-y-2.5">
              <li>
                <Button
                  as={A}
                  href="/dashboard"
                  variant={"outline"}
                  class="w-full justify-start gap-2.5"
                >
                  <CircleGauge size={16} /> Overview
                </Button>
              </li>
              <li>
                <Button
                  as={A}
                  href="/dashboard/payment"
                  variant={"outline"}
                  class="w-full justify-start gap-2.5"
                >
                  <PhilippinePeso size={16} />
                  Payment
                </Button>
              </li>
              <li>
                <Button
                  variant={"outline"}
                  as={A}
                  href="/dashboard/tenant"
                  class="w-full justify-start gap-2.5"
                >
                  <ScrollText size={16} />
                  Tenant
                </Button>
              </li>
              <li>
                <Button
                  variant={"outline"}
                  as={A}
                  href="/dashboard/maintenance"
                  class="w-full justify-start gap-2.5"
                >
                  <Hammer size={16} />
                  Maintenance
                </Button>
              </li>
              <li>
                <Button
                  variant={"outline"}
                  as={A}
                  href="/dashboard/rooms"
                  class="w-full justify-start gap-2.5"
                >
                  <Bed size={16} />
                  Rooms
                </Button>
              </li>
            </ul>
          </nav>
        </div>
        <form action={logout} method="post">
          <Button
            type="submit"
            variant={"ghost"}
            class="gap-2.5 w-full justify-start"
          >
            {" "}
            <LogOut size={16} /> Sign out
          </Button>
        </form>
      </aside>
      <div class="col-span-10 overflow-y-auto">
        <header class="p-4 flex flex-row justify-between border-b border-border">
          <div class="flex flex-row items-center gap-5">
            <h4>{props.location.pathname}</h4>
          </div>
          <Input class="w-1/2" placeholder="Search something..." />
          <div class="flex flex-row gap-5">
            <Button variant={"ghost"}>
              <Bell size={16} />
            </Button>
            <Separator orientation="vertical" />
            <Show when={landlordInfo()?.record !== undefined}>
              <Avatar>
                <AvatarImage src={`https://apartment.f-org-e.systems/api/files/pb_users_auth/${landlordInfo()?.record.id}/${landlordInfo()?.record.avatar}`} />
                <AvatarFallback>{landlordInfo()?.record?.firstname?.at(0)?.toUpperCase()}{landlordInfo()?.record?.lastname?.at(0)?.toUpperCase()}</AvatarFallback>
              </Avatar>
            </Show>
          </div>  
        </header>
        <div class="p-4">{props.children}</div>
      </div>
    </main>
  );
};

export default DashboardLayout;
