export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  loading?: boolean;
  error?: boolean;
}
