import { useState } from 'react';
import { useImmer } from 'use-immer';
import { ChatMessages } from './ChatMessages';
import { ChatMessageInput } from './ChatMessageInput';
import { ChatMessage } from '../types/ChatMessage';

function Chatbot() {
  const [chatId, setChatId] = useState(null);
  const [messages, setMessages] = useImmer<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const isLoading = messages.length && messages[messages.length - 1].loading;

  async function submitNewMessage() {
    // Placeholder
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