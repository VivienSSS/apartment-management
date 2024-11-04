import { RouteSectionProps } from "@solidjs/router";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import Input from "~/components/ui/input";
import { Separator } from "~/components/ui/separator";
import { logout, validateUser } from "~/lib/utils";
import {
  Bell,
  CircleGauge,
  Home,
  LogOut,
  PhilippinePeso,
  ScrollText,
  Star,
} from "lucide-solid";

export const route = {
  preload: () => validateUser(),
};

const DashboardLayout = (props: RouteSectionProps) => {
  return (
    <main class="h-screen max-h-screen grid grid-cols-12 max-w-[1920px] container mx-auto">
      <aside class="col-span-2 p-4 border-r border-border flex flex-col justify-between">
        <div class="space-y-5">
          <h2 class="scroll-m-20 text-2xl font-semibold tracking-tight">
            Ocampo's Apartment management
          </h2>
          <nav>
            <ul class="space-y-2.5">
              <li>
                <Button
                  variant={"outline"}
                  class="w-full justify-start gap-2.5"
                >
                  <CircleGauge size={16} /> Overview
                </Button>
              </li>
              <li>
                <Button
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
                  class="w-full justify-start gap-2.5"
                >
                  <ScrollText size={16} />
                  Tenant
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
      <article class="col-span-10">
        <header class="p-4 flex flex-row justify-between border-b border-border">
          <div class="flex flex-row items-center gap-5">
            <h4>{props.location.pathname}</h4>
            <Button variant={"ghost"}>
              <Star size={16} />
            </Button>
          </div>
          <Input class="w-1/2" placeholder="Search something..." />
          <div class="flex flex-row gap-5">
            <Button variant={"ghost"}>
              <Bell size={16} />
            </Button>
            <Separator orientation="vertical" />
            <Avatar>
              <AvatarImage />
              <AvatarFallback>VA</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <div class="p-4">{props.children}</div>
      </article>
    </main>
  );
};

export default DashboardLayout;
