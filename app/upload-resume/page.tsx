"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UploadResumePage() {
  const [resumeText, setResumeText] = useState("");
  const router = useRouter();

  const handleStartInterview = () => {
    if (!resumeText.trim()) {
      alert("Please paste your resume text first.");
      return;
    }

    localStorage.setItem("resumeText", resumeText);
    router.push("/interview");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-4">Upload Resume</h1>

        <p className="text-gray-600 mb-4">
          Paste your resume text below. The AI will generate interview questions based on it.
        </p>

        <textarea
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          placeholder="Paste your resume here..."
          className="w-full h-80 border rounded-lg p-4"
        />

        <button
          onClick={handleStartInterview}
          className="mt-5 bg-black text-white px-6 py-3 rounded-lg"
        >
          Start Interview
        </button>
      </div>
    </div>
  );
}