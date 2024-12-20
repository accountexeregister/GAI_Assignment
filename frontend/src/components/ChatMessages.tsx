import { useAutoScroll } from "../hooks/useAutoScroll";
import { ChatMessage } from "../types/chat";
import { ChatMessageView } from "./ChatMessageView";

interface ChatMessagesProps {
  messages: ChatMessage[];
  isLoading: boolean;
}

function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  const scrollContentRef = useAutoScroll(isLoading);

  return (
    <div ref={scrollContentRef} className="grow space-y-4">
      {messages.map(({ id, role, content, loading, error, errorContent }) => (
        <ChatMessageView
          key={id}
          role={role}
          content={content}
          loading={loading}
          error={error}
          errorContent={errorContent}
        />
      ))}
    </div>
  );
}

export { ChatMessages };
