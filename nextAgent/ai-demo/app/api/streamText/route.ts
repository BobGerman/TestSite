import { streamText } from "ai";
import model from "../aimodel";

export async function POST(req: Request) { 
  const { prompt } = await req.json(); 

    const result = streamText({ 
    model,
    prompt,
    maxOutputTokens: 200, 
  }); 

  return result.toUIMessageStreamResponse(); 

} 
