import { Button } from "~/components/ui/button";
import { Component } from "solid-js";
import Input from "~/components/ui/input";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import { login } from "~/lib/utils";

const LoginPage: Component<{}> = (props) => {
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
