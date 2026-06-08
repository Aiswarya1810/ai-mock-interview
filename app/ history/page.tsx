"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Interview = {
  id: string;
  score: number;
  feedback: string;
  created_at: string;
};

export default function HistoryPage() {
  const [interviews, setInterviews] = useState<Interview[]>([]);

  useEffect(() => {
    const fetchInterviews = async () => {
      const { data } = await supabase
        .from("interviews")
        .select("*")
        .order("created_at", { ascending: false });

      setInterviews(data || []);
    };

    fetchInterviews();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Interview History</h1>

      {interviews.map((item) => (
        <div key={item.id} className="bg-white p-5 rounded-xl shadow mb-4">
          <h2 className="font-bold">Score: {item.score}/100</h2>
          <p className="text-sm text-gray-500">{item.created_at}</p>
          <pre className="whitespace-pre-wrap mt-3">{item.feedback}</pre>
        </div>
      ))}
    </div>
  );
}