import { useState } from 'react';
import { useImmer } from 'use-immer';
import { ChatMessages } from './ChatMessages';
import { ChatMessageInput } from './ChatMessageInput';
import { ChatMessage } from '../types/ChatMessage';

function Chatbot() {
//   const [chatId, setChatId] = useState(null);
  const [messages, setMessages] = useImmer<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const isLoading = messages.length > 0 && messages[messages.length - 1].loading;

  async function submitNewMessage() {
    // Placeholder
    const trimmedMessage = newMessage.trim();
    if (!trimmedMessage || isLoading) {
        return;
    }

    setMessages(draftMessage => [...draftMessage,
        { role: 'user', content: trimmedMessage },
        { role: 'assistant', content: '', sources: [], loading: true }
    ]);
    setNewMessage('');

    // Send message to OpenAI API
    // Set messages from OpenAI API results
  }

  return (
    <div>
      {messages.length === 0 && (
        <div>{"DeviceCare FAQ Chatbot"}</div>
      )}
      <ChatMessages
        messages={messages}
        isLoading={isLoading}
      />
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