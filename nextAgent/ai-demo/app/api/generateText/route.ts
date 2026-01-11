import { generateText } from "ai"; 
import model from "../aimodel";

export async function POST(req: Request) { 
  const { prompt } = await req.json(); 

  const { text } = await generateText({
    model,
    prompt,
    maxOutputTokens: 200,
  });

  return Response.json({ text }); 

} 
