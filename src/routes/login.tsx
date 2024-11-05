import { Button } from "~/components/ui/button";
import { Component, createEffect } from "solid-js";
import Input from "~/components/ui/input";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import { login } from "~/lib/utils";
import { useSubmission } from "@solidjs/router";
import { showToast } from "~/components/ui/toast";

const LoginPage: Component<{}> = (props) => {
  const loginResponse = useSubmission(login);

  createEffect(() => {
    if (loginResponse.error !== undefined) {
      const errorResponse = loginResponse.error;
      switch (errorResponse.code) {
        case 400:
          showToast({
            title: "Invalid operation",
            description: errorResponse.message,
          });
          break;
        default:
          showToast({
            title: `Internal server error`,
            description: `message: ${errorResponse.message}`,
            variant: "destructive",
          });
      }
    }
  });

  return (
    <main class="h-screen max-h-screen flex justify-center items-center">
      <form action={login} class="space-y-5" method="post">
        <h1 class="scroll-m-20 text-2xl font-semibold tracking-tight">
          Log In
        </h1>
        <Input name="username" type="text" placeholder="Username" />
        <Input name="password" type="password" placeholder="Password" />
        <div class="items-top flex space-x-2">
          <Checkbox name="rememberMe" />
          <div class="grid gap-1.5 leading-none">
            <Label for="terms1-input">Remember Me</Label>
          </div>
        </div>
        <Button type="submit" class="w-full">
          Log In
        </Button>
        <p class="text-sm text-muted-foreground">
          The developers will provide you your password and username.
        </p>
      </form>
    </main>
  );
};

export default LoginPage;
