interface ChatbotResponse {
  role: "user" | "assistant";
  content: string;
}

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  loading?: boolean;
  error?: boolean;
  errorContent?: string;
}

export type { ChatbotResponse, ChatMessage };
