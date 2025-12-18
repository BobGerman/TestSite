import model from '../aimodel';
import { generateObject } from 'ai';
import { TestArgs, TestResponse } from './interfaces';

import { schema } from './recipe-schema';

// import schema from './recipe-schema.json';

const DEFAULT_SYSTEM_PROMPT = 'You are brilliant chef who has mastered the culinary arts.';
const DEFAULT_USER_PROMPT = 'Lasagne';
const DEFAULT_TEMPERATURE = 0.5;

export async function getLLMCompletion(args: TestArgs):
  Promise<TestResponse> {
  try {

    const { object } = await generateObject({
      model,
      schema,
      prompt: args.userPrompt || DEFAULT_USER_PROMPT,
      system: args.systemPrompt || DEFAULT_SYSTEM_PROMPT,
      temperature: DEFAULT_TEMPERATURE
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
