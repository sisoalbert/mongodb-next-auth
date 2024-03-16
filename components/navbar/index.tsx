import { getUserFromSession } from "@/app/auth/auth";
import Link from "next/link";
import React, { ReactNode } from "react";

export default async function NavBar() {
  const user = await getUserFromSession();

  const email = user ? user?.email : null;
  return (
    <div className="flex justify-between p-4">
      <Link href="/">MongoDB Next Auth</Link>
      {user ? (
        <Link href="/dashboard">{email as ReactNode}</Link>
      ) : (
        <Link href="/login">Login</Link>
      )}
      {/* <button onClick={logout}>Logout</button> */}
    </div>
  );
}
