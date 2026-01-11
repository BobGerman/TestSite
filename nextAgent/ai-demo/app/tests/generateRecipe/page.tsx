"use client";

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/generateRecipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      setResult(JSON.stringify(data.object, null, 2));

    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-light text-gray-800 mb-8">
        AI Text Generator
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt..."
          className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-300 focus:border-transparent outline-none resize-none transition-all text-gray-800 bg-white"
          rows={4}
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </form>

      {result && (
        <div className="mt-8 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Generated Text:
          </h3>
          <div className="text-gray-600 leading-relaxed whitespace-pre-wrap break-words">
            {result}
          </div>
        </div>
      )}
    </div>
  );
}
