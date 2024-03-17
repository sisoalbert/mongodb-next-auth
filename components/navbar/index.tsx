import { getUserFromSession } from "@/app/auth/auth";
import Link from "next/link";
import React, { ReactNode } from "react";
import Logout from "../buttons/logout";

export default async function NavBar() {
  const user = await getUserFromSession();

  const email = user ? user?.email : null;
  return (
    <div className="flex justify-between p-4 items-center">
      <Link href="/">MongoDB Next Auth</Link>
      {user ? (
        <div className="flex justify-between p-4 items-center">
          <Logout /> <Link href="/dashboard">{email as ReactNode}</Link>
        </div>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </div>
  );
}
