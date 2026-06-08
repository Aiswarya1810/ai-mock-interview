import Link from "next/link";


export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="bg-white max-w-3xl p-10 rounded-2xl shadow text-center">
        <h1 className="text-5xl font-bold mb-4">AI Mock Interview</h1>
        <p className="text-gray-600 text-lg mb-8">
          Practice interviews using AI-generated questions based on your resume.
        </p>

        <Link
          href="/dashboard"
          className="bg-black text-white px-6 py-3 rounded-lg"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}