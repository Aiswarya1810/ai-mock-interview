"use client";

import { useState } from "react";
import genAI from "@/lib/gemini";
import { supabase } from "@/lib/supabase";

export default function InterviewPage() {
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const generateQuestions = async () => {
    const resumeText = localStorage.getItem("resumeText");

    if (!resumeText) {
      alert("Please upload your resume first.");
      return;
    }

    setLoading(true);

    try {
      const model = genAI.getGenerativeModel({
     model: "gemini-2.5-flash",
   });
      const prompt = `
Generate 5 interview questions based on this resume.
Only return the questions as a numbered list.

Resume:
${resumeText}
`;

      const result = await model.generateContent(prompt);
      const text = result.response.text();

      const questionList = text
        .split("\n")
        .filter((line) => line.trim() !== "")
        .map((line) => line.replace(/^\d+[\).\s-]*/, "").trim());

      setQuestions(questionList);
      setAnswers(new Array(questionList.length).fill(""));
    } catch (error) {
      console.error(error);
      alert("Failed to generate questions.");
    }

    setLoading(false);
  };

  const submitAnswers = async () => {
    const resumeText = localStorage.getItem("resumeText");

    setLoading(true);

    try {
      const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
   });

      const prompt = `
You are an interview coach.

Resume:
${resumeText}

Questions:
${questions.join("\n")}

Answers:
${answers.join("\n")}

Give:
1. Score out of 100
2. Short feedback
3. Strengths
4. Improvements
`;

      const result = await model.generateContent(prompt);
      const aiFeedback = result.response.text();

      const scoreMatch = aiFeedback.match(/\d+/);
      const finalScore = scoreMatch ? Number(scoreMatch[0]) : 70;

      setFeedback(aiFeedback);
      setScore(finalScore);

      await supabase.from("interviews").insert({
        resume_text: resumeText,
        questions: questions.join("\n"),
        answers: answers.join("\n"),
        score: finalScore,
        feedback: aiFeedback,
      });
    } catch (error) {
      console.error(error);
      alert("Failed to submit interview.");
    }

    setLoading(false);
  };

  

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6">AI Interview</h1>

{questions.length === 0 && (
  <button
    onClick={generateQuestions}
    disabled={loading}
    className="bg-black text-white px-6 py-3 rounded-lg mb-6"
  >
    {loading ? "Generating..." : "Generate Questions"}
  </button>
)}

{loading && <p>Loading...</p>}

        {questions.map((question, index) => (
          <div key={index} className="mb-6">
            <p className="font-semibold mb-2">
              {index + 1}. {question}
            </p>

            <textarea
              value={answers[index]}
              onChange={(e) => {
                const updated = [...answers];
                updated[index] = e.target.value;
                setAnswers(updated);
              }}
              placeholder="Type your answer..."
              className="w-full h-28 border rounded-lg p-3"
            />
          </div>
        ))}

        {questions.length > 0 && (
          <button
            onClick={submitAnswers}
            className="bg-black text-white px-6 py-3 rounded-lg"
          >
            Submit Answers
          </button>
        )}

        {feedback && (
          <div className="mt-8 bg-gray-50 border rounded-lg p-5">
            <h2 className="text-2xl font-bold mb-3">
              Score: {score}/100
            </h2>
            <pre className="whitespace-pre-wrap">{feedback}</pre>
          </div>
        )}
      </div>
    </div>
  );
}