export interface MethodArgs {
    userPrompt: string;
    systemPrompt?: string;
}

export interface MethodResponse {
    systemPrompt?: string;
    userPrompt?: string;
    success: boolean;
    statusMessage: string;
    completion?: string;
    detailMessage?: string;
    messageHistory?: string[];
    objectCompletion?: any;
}
