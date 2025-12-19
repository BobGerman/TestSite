import model from '../aimodel';
import { generateObject } from 'ai';
import { TestArgs, TestResponse } from './aiTest';

import { schema } from './recipe-schema';

// import schema from './recipe-schema.json';

const DEFAULT_SYSTEM_PROMPT = 'You are a skilled bartender at one of the top hotels in the world..';
const DEFAULT_USER_PROMPT = 'Old Fashioned cocktail';
const DEFAULT_TEMPERATURE = 0.5;

export async function getLLMCompletion(args: TestArgs):
  Promise<TestResponse> {
  try {

    const { object } = await generateObject({
      model,
      schema,
      prompt: args.userPrompt || DEFAULT_USER_PROMPT,
      system: args.systemPrompt || DEFAULT_SYSTEM_PROMPT,
      temperature: args.temperature || DEFAULT_TEMPERATURE
    });
    return {
      userPrompt: args.userPrompt || DEFAULT_USER_PROMPT,
      systemPrompt: args.systemPrompt || DEFAULT_SYSTEM_PROMPT,
      success: true,
      statusMessage: 'LLM completion successful',
      completion: `Generated ${object.recipe.ingredients.length} ingredients and ${object.recipe.steps.length} steps.`,
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
