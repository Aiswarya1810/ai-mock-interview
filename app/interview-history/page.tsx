"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/NavbarComponent";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type Interview = {
  id: string;
  score: number | null;
  feedback: string | null;
  created_at: string;
};

export default function InterviewHistoryPage() {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchHistory = async () => {
      const { data: userData } = await supabase.auth.getUser();

      if (!userData.user) {
        router.push("/login");
        return;
      }

      const { data, error } = await supabase
        .from("interviews")
        .select("id, score, feedback, created_at")
        .order("created_at", { ascending: false });

      if (error) {
        alert(error.message);
      } else {
        setInterviews(data || []);
      }

      setLoading(false);
    };

    fetchHistory();
  }, [router]);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-4xl font-bold mb-6">Interview History</h1>

        {loading && <p>Loading...</p>}

        {!loading && interviews.length === 0 && (
          <p className="text-gray-600">No interviews found yet.</p>
        )}

        <div className="grid gap-4">
          {interviews.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-xl shadow">
              <p className="font-bold">Score: {item.score ?? "N/A"}</p>
              <p className="text-gray-600 mt-2">{item.feedback}</p>
              <p className="text-sm text-gray-400 mt-3">
                {new Date(item.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}