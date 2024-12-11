import { useEffect, useState } from "react";
import { useImmer } from "use-immer";
import { ChatMessages } from "./ChatMessages";
import { ChatMessageInput } from "./ChatMessageInput";
import { ChatMessage } from "../types/ChatMessage";
import { sendMessageToChatbot, getFaqs } from "../chatbotApi";
import { v4 as uuidv4 } from "uuid";

function Chatbot() {
  const [faqs, setFaqs] = useState<string[]>([]);
  const [messages, setMessages] = useImmer<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    async function setupFaqs() {
      try {
        const faqs = await getFaqs();
        setFaqs(faqs);
      } catch (error) {
        console.error(error);
        setFaqs([]);
      }
    }
    setupFaqs();
  }, []);

  const isLoading =
    messages.length > 0 && !!messages[messages.length - 1].loading;

  async function submitNewMessage(message: string) {
    const trimmedMessage = message.trim();
    if (!trimmedMessage || isLoading) {
      return;
    }

    setMessages((draftMessage) => [
      ...draftMessage,
      { id: uuidv4(), role: "user", content: trimmedMessage },
      { id: uuidv4(), role: "assistant", content: "", loading: true },
    ]);

    try {
      const response = await sendMessageToChatbot(trimmedMessage);
      setMessages((draftMessage) => {
        draftMessage[draftMessage.length - 1].content = response.content;
      });
      setMessages((draft) => {
        draft[draft.length - 1].loading = false;
      });
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        setMessages((draftMessage) => {
          draftMessage[draftMessage.length - 1].errorContent = error.message;
        });
      } else {
        setMessages((draftMessage) => {
          draftMessage[draftMessage.length - 1].errorContent =
            "An unknown error occurred. Please try again later.";
        });
      }
      setMessages((draftMessage) => {
        draftMessage[draftMessage.length - 1].loading = false;
        draftMessage[draftMessage.length - 1].error = true;
      });
    }
  }

  async function submitTypedMessage() {
    await submitNewMessage(newMessage);
    setNewMessage("");
  }

  async function submitButtonMessage(question: string) {
    await submitNewMessage(question);
  }

  return (
    <div className="relative grow flex flex-col gap-6 pt-6">
      {messages.length === 0 && (
        <div className="mt-3 font-urbanist text-primary-blue text-xl font-light space-y-2">
          <p>I am an AI Chatbot for Frontline Customer Support.</p>
          <p>
            Feel free to ask me anything about the DeviceCare. I will try to
            answer as much as possible.
          </p>
        </div>
      )}
      {/* Quick action buttons */}
      <div className="flex flex-wrap gap-4">
        {faqs.map((question, index) => (
          <button
            key={index}
            onClick={() => submitButtonMessage(question)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {question}
          </button>
        ))}
      </div>
      <ChatMessages messages={messages} isLoading={isLoading} />
      <ChatMessageInput
        newMessage={newMessage}
        isLoading={isLoading}
        setNewMessage={setNewMessage}
        submitTypedMessage={submitTypedMessage}
      />
    </div>
  );
}

export { Chatbot };
