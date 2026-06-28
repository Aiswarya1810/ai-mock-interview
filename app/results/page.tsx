"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/NavbarComponent";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Interview = {
  id: string;
  score: number | null;
  feedback: string | null;
  questions: string | null;
  answers: string | null;
  created_at: string;
};

export default function ResultsPage() {
  const [latest, setLatest] = useState<Interview | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchLatestResult = async () => {
      const { data: userData } = await supabase.auth.getUser();

      if (!userData.user) {
        router.push("/login");
        return;
      }

      const { data, error } = await supabase
        .from("interviews")
        .select("id, score, feedback, questions, answers, created_at")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        setLatest(null);
      } else {
        setLatest(data);
      }

      setLoading(false);
    };

    fetchLatestResult();
  }, [router]);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-4xl font-bold mb-6">Latest Result</h1>

        {loading && <p>Loading...</p>}

        {!loading && !latest && (
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-600 mb-4">No result found yet.</p>
            <Link href="/upload-resume" className="font-bold">
              Start your first interview
            </Link>
          </div>
        )}

        {latest && (
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-2xl font-bold mb-4">
              Score: {latest.score ?? "N/A"}
            </h2>

            <p className="text-gray-700 whitespace-pre-line">
              {latest.feedback}
            </p>

            <p className="text-sm text-gray-400 mt-4">
              {new Date(latest.created_at).toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </>
  );
}