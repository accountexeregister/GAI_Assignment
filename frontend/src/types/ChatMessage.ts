export interface ChatMessage {
    role: "user" | "assistant";
    content: string;
    sources?: any;
    loading: boolean;
    error?: boolean
}