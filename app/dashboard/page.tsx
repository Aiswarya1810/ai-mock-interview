"use client";

import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-6">Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <Link href="/upload-resume" className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold">Start Interview</h2>
          <p className="text-gray-600 mt-2">Upload resume and get AI questions.</p>
        </Link>

        <Link href="/history" className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold">Interview History</h2>
          <p className="text-gray-600 mt-2">View your previous feedback.</p>
        </Link>

        <Link href="/results" className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold">Results</h2>
          <p className="text-gray-600 mt-2">Check your latest score.</p>
        </Link>
      </div>
    </div>
  );
}