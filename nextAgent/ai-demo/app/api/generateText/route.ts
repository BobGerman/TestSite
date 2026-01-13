import { generateText } from "ai"; 
import model from "../aimodel";

export async function POST(req: Request) { 
  const { prompt, systemPrompt, temperature } = await req.json(); 

  const { text } = await generateText({
    model,
    prompt,
    system: systemPrompt,
    temperature,
    maxOutputTokens: 200,
  });

  return Response.json({ text }); 

} 
