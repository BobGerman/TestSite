import model from '../aimodel';
import { generateText, Output } from 'ai';
import { TestArgs, TestResponse } from './aiTest';

import { schema } from './recipe-schema';

// import schema from './recipe-schema.json';

const DEFAULT_SYSTEM_PROMPT = 'You are a skilled bartender at one of the top hotels in the world..';
const DEFAULT_USER_PROMPT = 'Old Fashioned cocktail';
const DEFAULT_TEMPERATURE = 0.5;

export async function getLLMCompletion(args: TestArgs):
  Promise<TestResponse> {
  try {

    const { output } = await generateText({
      model,
      output: Output.object({
        schema
      }),
      prompt: args.userPrompt || DEFAULT_USER_PROMPT,
      system: args.systemPrompt || DEFAULT_SYSTEM_PROMPT,
      temperature: args.temperature || DEFAULT_TEMPERATURE
    });
    return {
      userPrompt: args.userPrompt || DEFAULT_USER_PROMPT,
      systemPrompt: args.systemPrompt || DEFAULT_SYSTEM_PROMPT,
      success: true,
      statusMessage: 'LLM completion successful',
      completion: `Generated ${output.recipe.ingredients.length} ingredients and ${output.recipe.steps.length} steps.`,
      objectCompletion: output
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
