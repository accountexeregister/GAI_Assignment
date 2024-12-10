export interface ChatMessage {
    messenger: "user" | "chatbot";
    content: string;
    loading: boolean;
}