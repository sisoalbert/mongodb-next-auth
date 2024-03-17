"use server";
import { redirect } from "next/navigation";
import * as Realm from "realm-web";
import { setSessionCookie } from "../auth/auth";
const app = new Realm.App({
  id: process.env.NEXT_PUBLIC_APP_ID as string,
});

const emailPasswordCredentials = async (email: string, password: string) => {
  const credentials = Realm.Credentials.emailPassword(email, password);
  try {
    const user = await app.logIn(credentials);
    return user;
  } catch (error) {
    console.error("error", error);
  }
};

export async function authenticate(_currentState: unknown, formData: FormData) {
  const app = new Realm.App({
    id: process.env.NEXT_PUBLIC_APP_ID as string,
  });
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { isError: true, message: "Email and password are requiredÍ" };
  }
  if (email && password) {
    const user = await emailPasswordCredentials(email, password);
    if (!user) {
      console.log("Invalid email or password");
      return { isError: true, message: "Invalid email or password" };
    }
    await setSessionCookie(user.id);
    redirect("/dashboard");
  } else {
    console.log("error");
    return { isError: true, message: "oops, something went wrong" };
  }
}

export async function logoutcurrentUser() {
  try {
    await app.currentUser?.logOut();
  } catch (error) {
    console.error("error", error);
  }
}
