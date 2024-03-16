"use client";

import { authenticate } from "@/app/lib/actions";
import { useFormState, useFormStatus } from "react-dom";

export default function Page() {
  const [Message, dispatch] = useFormState(authenticate, undefined);

  console.log(Message);

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        action={dispatch}
      >
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            name="email"
            placeholder="Email"
            required
          />
        </div>
        <div className="mb-6">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </div>
        <div>
          {/* {Message && <p className="text-red-500 text-xs italic">{Message}</p>} */}
        </div>
        <LoginButton />
      </form>
    </div>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-full py-2 px-3 rounded focus:outline-none focus:shadow-outline"
      aria-disabled={pending}
      type="submit"
    >
      Login
    </button>
  );
}
