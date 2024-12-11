import { useState } from "react";
import { useImmer } from "use-immer";
import { ChatMessages } from "./ChatMessages";
import { ChatMessageInput } from "./ChatMessageInput";
import { ChatMessage } from "../types/ChatMessage";
import { sendMessageToAI } from "../ai-api";
import { v4 as uuidv4 } from "uuid";

function Chatbot() {
  const [messages, setMessages] = useImmer<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const isLoading =
    messages.length > 0 && !!messages[messages.length - 1].loading;

  async function submitNewMessage() {
    const trimmedMessage = newMessage.trim();
    if (!trimmedMessage || isLoading) {
      return;
    }

    setMessages((draftMessage) => [
      ...draftMessage,
      { id: uuidv4(), role: "user", content: trimmedMessage },
      { id: uuidv4(), role: "assistant", content: "", loading: true },
    ]);
    setNewMessage("");

    try {
      const response = await sendMessageToAI(trimmedMessage);
      setMessages((draftMessage) => {
        draftMessage[draftMessage.length - 1].content = response.content;
      });
      setMessages((draft) => {
        draft[draft.length - 1].loading = false;
      });
    } catch (error) {
      console.log(error);
      setMessages((draftMessage) => {
        draftMessage[draftMessage.length - 1].loading = false;
        draftMessage[draftMessage.length - 1].error = true;
      });
    }
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
      <ChatMessages messages={messages} isLoading={isLoading} />
      <ChatMessageInput
        newMessage={newMessage}
        isLoading={isLoading}
        setNewMessage={setNewMessage}
        submitNewMessage={submitNewMessage}
      />
    </div>
  );
}

export { Chatbot };
