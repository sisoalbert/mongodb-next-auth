import React from "react";
import { logout } from "../lib/actions";
import * as Realm from "realm-web";

export default function page() {
  const app = new Realm.App({
    id: process.env.NEXT_PUBLIC_APP_ID as string,
  });

  return (
    <div>
      <div className="flex justify-between p-4">
        <p>MongoDB Next Auth</p>
        <button onClick={logout}>logout</button>
      </div>
      {/* logged in use id */}
      <p>User id: {app.currentUser?.id}</p>
    </div>
  );
}
