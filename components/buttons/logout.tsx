import { removeSession } from "@/app/auth/auth";
import { logoutcurrentUser } from "@/app/lib/actions";
import { redirect } from "next/navigation";
import React from "react";

const action = async () => {
  "use server";
  await removeSession();
  await logoutcurrentUser();
  redirect("/login");
};

function Logout() {
  return (
    <form action={action}>
      <button className="mx-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Logout
      </button>
    </form>
  );
}

export default Logout;
