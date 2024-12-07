import { action, query, redirect } from "@solidjs/router";
import { type ClassValue, clsx } from "clsx";

import { twMerge } from "tailwind-merge";
import { useSession } from "vinxi/http";
import { config } from "~/config";
import Pocketbase, { ClientResponseError } from "pocketbase";
import { TypedPocketBase } from "./pocketbase-types";

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
  const pb = new Pocketbase(process.env.POCKETBASE_URL) as TypedPocketBase;

  if (Object.keys(sessionData.data).length !== 0) {
    console.log("User is already logged in");
    throw redirect("/dashboard");
  }

  try {
    const authRecord = await pb.collection("users").authWithPassword(
      username,
      password,
    );
    // update session data
    await session.update(authRecord);
    console.log(authRecord);
    throw redirect("/dashboard");
  } catch (error) {
    if (error instanceof ClientResponseError && error.status === 400) {
      throw {
        code: 400,
        message: error.message,
      };
    }
    throw error;
  }
});

export const validateUser = query(async () => {
  "use server";
  const session = await useSession({
    password: config.credentials.sessionPassword,
  });
  const sessionData = session.data;
  if (Object.keys(sessionData).length === 0) {
    throw redirect("/login");
  } else {
    throw redirect("/dashboard");
  }
}, "validateUser");

export const logout = action(async () => {
  "use server";
  const session = useSession({
    password: config.credentials.sessionPassword,
  });
  try {
    const sessionData = await session;
    await sessionData.clear();
  } catch (error) {
    throw error;
  }
}, "logout");

export const getPocketbase = async () => {
  "use server";
  const pb = new Pocketbase(
    process.env.POCKETBASE_URL,
  ) as TypedPocketBase;
  const session = await useSession({
    password: config.credentials.sessionPassword,
  });

  const { token } = session.data as {
    token: string;
  };

  pb.authStore.save(token, session.data.record);
  return pb;
};
