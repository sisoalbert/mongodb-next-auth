import Link from "next/link";
import React from "react";

function Home() {
  return (
    <div>
      <div className="flex justify-between p-4">
        <p>MongoDB Next Auth</p>
        <Link href="/login">Login</Link>
      </div>
    </div>
  );
}

export default Home;
