import { generateText, Output } from "ai"; 
import model from "../aimodel";

export async function POST(req: Request) { 
  const { prompt, systemPrompt, temperature } = await req.json(); 

  const { text } = await generateText({
    model,
    prompt: prompt || "I am unsure",
    system: systemPrompt || "Analyze the sentiment of the given text and respond with Positive, Negative, or Neutral.",
    output: Output.choice({options: ["Positive", "Negative", "Neutral"]}),
    temperature : temperature ?? 0.7,
    maxOutputTokens: 200,
  });

  return Response.json({ text }); 

} 
