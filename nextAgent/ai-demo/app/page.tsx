"use client";

export default function Home() {

  return (

    <div className="max-w-2xl mx-auto p-6 min-h-screen bg-gray-50 text-gray-800">
      <h1 className="text-3xl font-light text-gray-800 mb-8">
        Bob&apos;s Agent Playground
      </h1>

      <p className="mb-4">
        Welcome to Bob&apos;s Agent Playground!
        This app uses Vercel AI Library and NextJS to showcase AI features used in agents
        using local AI models (though this could be changed fairly easily by modifying the
        api/aimodel.ts file. 
      </p>
    </div>
  );
}
