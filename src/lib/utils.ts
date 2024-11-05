import { action, query, redirect } from "@solidjs/router";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useSession } from "vinxi/http";
import { config } from "~/config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const login = action(async (formData: FormData) => {
  "use server";
  const session = await useSession({
    password: config.credentials.sessionPassword,
  });
  const sessionData = session;
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const rememberMe = formData.get("rememberMe") as string;

  // check if username and password are not empty
  if (!username || !password) {
    throw {
      code: 400,
      message: "Invalid username or password",
    };
  }
  // check if username and password are correct
  if (
    config.credentials.username === username &&
    config.credentials.password === password
  ) {
    // check if session data is empty
    if (Object.keys(sessionData.data).length === 0) {
      if (
        sessionData.data.username === username &&
        sessionData.data.password === password
      ) {
        throw redirect("/dashboard");
      }
    }
    // update session data
    await session.update((data) => {
      data.username = username;
      data.rememberMe = rememberMe;
      data.password = password;
      return data;
    });
    // redirect
    throw redirect("/dashboard");
  }
  throw {
    code: 400,
    message: "Invalid username or password"
  }
});

export const validateUser = query(async () => {
  "use server";
  const session = await useSession({
    password: config.credentials.sessionPassword,
  });
  const sessionData = session;
  if (Object.keys(sessionData.data).length === 0) {
    throw redirect("/login");
  }
}, "validateUser");

export const logout = action(async () => {
  "use server";
  const session = useSession({
    password: config.credentials.sessionPassword,
  });
  const sessionData = await session;
  await sessionData.update((data) => {
    data.username = undefined;
    data.rememberMe = undefined;
    data.password = undefined;
    return data;
  });
  throw redirect("/login");
}, "logout");
