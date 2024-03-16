import React from "react";
import { logout } from "../lib/actions";
import * as Realm from "realm-web";
import Link from "next/link";
import NavBar from "@/components/navbar";

export default function page() {
  const app = new Realm.App({
    id: process.env.NEXT_PUBLIC_APP_ID as string,
  });

  return (
    <div>
      <NavBar />
      {/* logged in use id */}
      <p>User id: {app.currentUser?.id}</p>
    </div>
  );
}
