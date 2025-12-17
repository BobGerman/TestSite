export interface MethodArgs {
    userPrompt: string;
    systemPrompt?: string;
}

export interface MethodResponse {
    success: boolean;
    statusMessage: string;
    completion?: string;
    detailMessage?: string;
}