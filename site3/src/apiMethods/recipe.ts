import model from '../aimodel';
import { generateObject, jsonSchema } from 'ai';
import { MethodArgs, MethodResponse } from './method';

// import { z } from "zod";

// const schema = z.object({
//   recipe: z.object({
//     name: z.string(),
//     ingredients: z.array(
//       z.object({
//         name: z.string(),
//         amount: z.string(),
//       }),
//     ),
//     steps: z.array(z.string()),
//   }),
// });

import schema from './recipe-schema.json';

const DEFAULT_SYSTEM_PROMPT = 'You are brilliant chef who has mastered the culinary arts.';
const DEFAULT_USER_PROMPT = 'Lasagne';
const DEFAULT_TEMPERATURE = 0.5;

export async function getLLMCompletion(args: MethodArgs):
  Promise<MethodResponse> {
  try {

    const schamaProp = jsonSchema(schema);
    const { object } = await generateObject({
      model,
      schema: schamaProp,
      prompt: args.userPrompt || DEFAULT_USER_PROMPT,
      system: args.systemPrompt || DEFAULT_SYSTEM_PROMPT,
      temperature: DEFAULT_TEMPERATURE
    });
    return {
      success: true,
      statusMessage: 'LLM completion successful',
      completion: "Recipe generated successfully.",
      objectCompletion: object
    };
  } catch (error: any) {
    console.error('Error in getLLMCompletion:', error);
    return {
      success: false,
      statusMessage: `Error from LLM: ${error.message}`,
      detailMessage: error.responseBody || ''
    };
  }
}
