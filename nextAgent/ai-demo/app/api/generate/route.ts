// import { generateText } from "ai"; 
// import { google } from "@ai-sdk/google"; 
import { streamText } from "ai";
import model from "../aimodel";

export async function POST(req: Request) { 
  const { prompt } = await req.json(); 


//   const { text } = await generateText({ 
//     model: google("gemini-1.5-flash"), 
//     prompt: prompt, 
//     maxOutputTokens: 200, 
//   }); 


  // const { text } = await generateText({
  //   model,
  //   prompt,
  //   maxOutputTokens: 200,
  // });

  // return Response.json({ text }); 

    const result = streamText({ 
    model,
    prompt,
    maxOutputTokens: 200, 
  }); 

  return result.toUIMessageStreamResponse(); 

} 
