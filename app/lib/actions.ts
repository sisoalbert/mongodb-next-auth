"use server";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import * as Realm from "realm-web";
import { cookies } from "next/headers";

export async function handleLogin(currentUser: string, sessionData?: any) {
  // const encryptedSessionData = encrypt(sessionData) // Encrypt your session data
  const encryptedSessionData = sessionData;
  cookies().set("currentUser", currentUser, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // One week
    path: "/",
  });
  // Redirect or handle the response after setting the cookie
  redirect("/dashboard");
}

export async function authenticate(_currentState: unknown, formData: FormData) {
  const app = new Realm.App({
    id: process.env.NEXT_PUBLIC_APP_ID as string,
  });
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    throw new Error("Email and password are required");
  }
  try {
    console.log("signing in user");

    const credentials = Realm.Credentials.emailPassword(email, password);
    const session = await app.logIn(credentials);
    // console.log("user", session);

    const user = app.currentUser; // Assuming this holds user data
    // Redirect to dashboard or handle successful login
    // console.log("user", user);
    if (user) {
      handleLogin(user.id);
    }
    return user?.id;
  } catch (error) {
    console.error("error", error);
    return "Invalid email or password or some other error";
  }
}

export async function logout() {
  const app = new Realm.App({
    id: process.env.NEXT_PUBLIC_APP_ID as string,
  });

  console.log("logging out");
  await app.currentUser?.logOut();
  console.log(app.currentUser?.id);

  // remove cookie
  cookies().delete("currentUser");
  redirect("/login");
}
