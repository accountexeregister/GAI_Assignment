import { ChatbotResponse } from "./types/ChatbotResponse";

const BACKEND_BASE_URL = import.meta.env.VITE_BASE_URL;

async function sendMessageToAI(message: string): Promise<ChatbotResponse> {
  const response = await fetch(BACKEND_BASE_URL + "/api/chats", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: message }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error);
  }
  return data;
}

export { sendMessageToAI };
