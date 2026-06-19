"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <nav className="bg-white shadow border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">
          AI MOCK INTERVIEW
        </h1>

        <div className="flex gap-6 items-center">
          <Link href="/dashboard">Dashboard</Link>

          <Link href="/upload-resume">
            Upload Resume
          </Link>

          <Link href="/interview">
            Interview
          </Link>

          <Link href="/interview-history">
            History
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}