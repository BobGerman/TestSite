import * as dotenv from 'dotenv';
import { generateText, LanguageModel } from 'ai';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';

export function getLanguageModel(): LanguageModel {

    const modelProvider = createOpenAICompatible({
        name: 'lmstudio',
        baseURL: process.env.LLM_BASE_URL || 'http://localhost:1234/v1'
    });

    const model = modelProvider(process.env.LLM_MODEL_ID || "");
    return model;

}
