import { ChatbotResponse } from "./types/chat";

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

async function sendMessageToChatbot(message: string): Promise<ChatbotResponse> {
  try {
    const response = await fetch(BACKEND_BASE_URL + "/api/chats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    let data;
    try {
      data = await response.json();
    } catch (parseError) {
      throw new Error("Unable to parse chatbot response. Please try again.");
    }

    if (!response.ok) {
      throw new Error(data.error);
    }

    return data.message;
  } catch (error) {
    // Handle network or other unexpected errors
    console.error(
      "Error occurred while sending the message to the chatbot:",
      error
    );
    throw new Error(
      error instanceof Error
        ? "Failed to send the message to the chatbot. The server might be down."
        : "An unknown error occurred. Please try again later."
    );
  }
}

async function getFaqs(): Promise<string[]> {
  try {
    const response = await fetch(BACKEND_BASE_URL + "/api/chats/faqs");

    let data;
    try {
      data = await response.json();
    } catch (parseError) {
      throw new Error(
        "Unable to parse the FAQs response. Please try again later."
      );
    }

    if (!response.ok) {
      throw new Error(
        `Error ${response.status}: ${data.error || "Failed to fetch FAQs."}`
      );
    }

    if (!data.faqs || !Array.isArray(data.faqs)) {
      throw new Error("Error: Invalid FAQs format received from the server.");
    }

    return data.faqs;
  } catch (error) {
    console.error("Error occurred while fetching FAQs:", error);
    throw new Error(
      error instanceof Error
        ? "Failed to fetch FAQs. The server might be down."
        : "An unknown error occurred while fetching FAQs."
    );
  }
}

export { sendMessageToChatbot, getFaqs };
