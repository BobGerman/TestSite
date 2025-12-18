// NOTE: This function uses in-memory state, so is only suitable for testing and prototyping by a single user
import model from '../aimodel';
import { generateText, ModelMessage, TextPart } from 'ai';
import { MethodArgs, MethodResponse } from './method';
import { get } from 'http';

const DEFAULT_SYSTEM_PROMPT = 'You are a helpful assistant who gives short and friendly answers, always 100 words or less.';
const DEFAULT_USER_PROMPT = 'Greet the user in a friendly manner.';
const DEFAULT_TEMPERATURE = 0.5;

let messages: ModelMessage[] = [
    { role: 'system', content: DEFAULT_SYSTEM_PROMPT }
];

export async function getLLMCompletion(args: MethodArgs):
    Promise<MethodResponse> {

    // Append user message to conversation history
    messages.push({
        role: 'user',
        content: args.userPrompt || DEFAULT_USER_PROMPT
    });

    // Construct the full prompt with system prompt and conversation history
    const { response } = await generateText({
        model,
        messages,
        temperature: DEFAULT_TEMPERATURE
    });

    const assistantMessage = response.messages[0];
    const textPart = assistantMessage.content[0] as TextPart;
    const assistantMessageText = textPart.text;

    messages.push({ role: 'assistant', content: assistantMessageText });

    return {
        userPrompt: args.userPrompt || DEFAULT_USER_PROMPT,
        systemPrompt: args.systemPrompt || DEFAULT_SYSTEM_PROMPT,
        success: true,
        statusMessage: 'LLM completion successful',
        completion: assistantMessageText,
        detailMessage: `${messages.length} messages in conversation history.`,
        messageHistory: messages.map(m => `${m.role}: ${m.content}`)
    };
}

function formatMessages(messages: ModelMessage[]): string {
    let result = '';
    for (const message of messages) {
        const s = message.content.length < 10 ? message.content :
            message.content.slice(0, 10) + '...';
        result += `[${message.role.toUpperCase()}]: ${s}`;
    }
    return result;
}

