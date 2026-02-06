import { embed } from "ai";
import embeddimgModel from "../../models/embedModel";

export async function POST(req: Request) {

  const { prompt } = await req.json();

  const { embedding } = await embed({
    model: embeddimgModel,
    value: prompt || "Hello, world!",
  });

  for (const val of embedding) {
    console.log(val);
  }

  return Response.json({ embedding });

} 
