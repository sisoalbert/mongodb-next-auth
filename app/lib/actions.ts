"use server";
import { redirect } from "next/navigation";
import * as Realm from "realm-web";
import { cookies } from "next/headers";
import { setSessionCookie } from "../auth/auth";

const emailPasswordCredentials = (email: string, password: string) => {
  if (email.endsWith("@example.com") && password === "password") {
    return {
      email,
    };
  }
};

export async function authenticate(_currentState: unknown, formData: FormData) {
  const app = new Realm.App({
    id: process.env.NEXT_PUBLIC_APP_ID as string,
  });
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    throw new Error("Email and password are required");
  }
  if (email && password) {
    console.log("signing in user", email);
    const user = emailPasswordCredentials(email, password);
    if (!user) {
      console.log("Invalid email or password");
      return { isError: true, message: "Invalid email or password" };
    }
    await setSessionCookie(user);
    redirect("/dashboard");

    // ########################
    // const credentials = Realm.Credentials.emailPassword(email, password);
    // const session = await app.logIn(credentials);
    // // console.log("user", session);

    // const user = app.currentUser; // Assuming this holds user data
    // // Redirect to dashboard or handle successful login
    // // console.log("user", user);
    // if (user) {
    //   handleLogin(user.id);
    // }
    // return user?.id;
  } else {
    console.log("error");
    return { isError: true, message: "oops, something went wrong" };
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
