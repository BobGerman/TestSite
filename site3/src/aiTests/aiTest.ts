export interface TestArgs {
    userPrompt: string;
    systemPrompt?: string;
    temperature?: number;
}

export interface TestResponse {
    systemPrompt?: string;
    userPrompt?: string;
    success: boolean;
    statusMessage: string;
    completion?: string;
    detailMessage?: string;
    messageHistory?: string[];
    objectCompletion?: any;
}
