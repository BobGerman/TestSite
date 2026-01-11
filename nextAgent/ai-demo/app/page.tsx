"use client";

export default function Home() {

  return (

    <div className="max-w-2xl mx-auto p-6 min-h-screen bg-gray-50 text-gray-800">
      <h1 className="text-3xl font-light text-gray-800 mb-8">
        AI Demo
      </h1>

      <ul className="list-disc list-inside">
        <li><a href="/pages/generateText">Generate Text</a></li>
        <li><a href="/pages/streamText">Stream Text</a></li>
        <li><a href="/pages/generateRecipe">Generate Recipe</a></li>
      </ul>
    </div>
  );
}
