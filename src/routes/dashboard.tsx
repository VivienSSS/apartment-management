import {
  A,
  AccessorWithLatest,
  createAsync,
  RouteSectionProps,
} from "@solidjs/router";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button, buttonVariants } from "~/components/ui/button";
import { logout, validateUser } from "~/lib/utils";
import {
  Bed,
  Bell,
  Building2,
  CircleGauge,
  Hammer,
  Home,
  LogOut,
  PhilippinePeso,
  ScrollText,
  Star,
} from "lucide-solid";
import { getCurrentLandlordInfo } from "~/lib/db/action/landlord";
import { For, Show } from "solid-js";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { UsersRecord } from "~/lib/pocketbase-types";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";

export const route = {
  preload: () => validateUser(),
};

const items = [
  {
    title: "Overview",
    icon: Home,
    href: "/dashboard",
  },
  {
    title: "Payment",
    icon: PhilippinePeso,
    href: "/dashboard/payment",
  },
  {
    title: "Maintenance",
    icon: Hammer,
    href: "/dashboard/maintenance",
  },
  {
    title: "Rooms",
    icon: Bed,
    href: "/dashboard/rooms",
  },
  {
    title: "Tenants",
    icon: ScrollText,
    href: "/dashboard/tenant",
  },
];

const DashboardLayout = (props: RouteSectionProps) => {
  const landlordInfo = createAsync(() => getCurrentLandlordInfo());

  return (
    <SidebarProvider>
      <AppSidebar landlordInfo={landlordInfo} />
      <main class="w-full overflow-y-auto">
        <header class="p-4 flex flex-row gap-2.5 items-center">
          <SidebarTrigger />
          <Breadcrumb>
            <BreadcrumbList>
              <For each={props.location.pathname.split("/")}>
                {(path, index) => (
                  <>
                    <BreadcrumbItem>{path}</BreadcrumbItem>
                    <Show
                      when={index() <
                        props.location.pathname.split("/").length - 1}
                    >
                      <BreadcrumbSeparator />
                    </Show>
                  </>
                )}
              </For>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div class="p-4">{props.children}</div>
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayout;

function AppSidebar(
  { landlordInfo }: {
    landlordInfo: AccessorWithLatest<
      { token: string; record: UsersRecord } | undefined
    >;
  },
) {
  return (
    <Sidebar>
      <SidebarHeader class="border-b">
        <h4 class="heading-4 flex flex-row items-center gap-2.5">
          <Building2 size={24} />
          AMS
        </h4>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <For each={items}>
                {(item) => (
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      as={A}
                      class={buttonVariants({
                        variant: "ghost",
                        size: "lg",
                        className: "justify-start",
                      })}
                      href={item.href}
                    >
                      <item.icon size={16} />
                      <span class="ml-2">{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
              </For>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter class="flex flex-row items-center gap-2.5">
        <Show when={landlordInfo() !== undefined}>
          <Avatar>
            <AvatarImage
              src={`https://apartment.f-org-e.systems/api/files/pb_users_auth/${landlordInfo()?.record?.id}/${landlordInfo()?.record?.avatar}`}
            />
            <AvatarFallback>
              {landlordInfo()?.record?.firstname?.at(0)?.toUpperCase()}
              {landlordInfo()?.record?.lastname?.at(0)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <p class="truncate">
            {landlordInfo()?.record?.firstname}{" "}
            {landlordInfo()?.record?.lastname}
          </p>
          <form action={logout} method="post">
            <Tooltip>
              <TooltipTrigger
                as={Button}
                variant="ghost"
                type="submit"
                onClick={() => {
                  window.location.href = "/login";
                }}
              >
                <LogOut size={16} />
              </TooltipTrigger>
              <TooltipContent>
                Log out
              </TooltipContent>
            </Tooltip>
          </form>
        </Show>
      </SidebarFooter>
    </Sidebar>
  );
}
