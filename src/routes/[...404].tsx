import { A } from "@solidjs/router";
import { Button } from "~/components/ui/button";
import { ArrowLeft } from "lucide-solid";

export default function NotFound() {
  return (
    <main class="h-screen flex flex-col justify-center items-center gap-4">
      <div class="text-center">
        <h1 class="text-7xl font-bold">404</h1>
        <span class="text-2xl">Page not found</span>
      </div>
      <p class="text-muted-foreground">
        Sorry, the page you're looking for cannot be found.
      </p>
      <Button as={A} href="/dashboard/payment" class="gap-2.5">
        <ArrowLeft size={16} /> Back to dashboard.
      </Button>
    </main>
  );
}
