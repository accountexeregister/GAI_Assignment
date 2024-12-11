import Markdown from "react-markdown";
import { useAutoScroll } from "../hooks/useAutoScroll";
import { Spinner } from "./Spinner";
import userIcon from "../assets/images/user.jpg";
import errorIcon from "../assets/images/error.png";
import { ChatMessage } from "../types/ChatMessage";

interface ChatMessagesProps {
  messages: ChatMessage[];
  isLoading: boolean;
}

function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  const scrollContentRef = useAutoScroll(isLoading);

  return (
    <div ref={scrollContentRef} className="grow space-y-4">
      {messages.map(({ id, role, content, loading, error }) => (
        <div
          key={id}
          className={`flex items-start gap-4 py-4 px-3 rounded-xl break-all ${role === "user" ? "bg-primary-blue/10" : ""}`}
        >
          {role === "user" && (
            <img
              className="h-[26px] w-[26px] shrink-0"
              src={userIcon}
              alt="user"
            />
          )}
          <div>
            <div className="markdown-container">
              {loading && !content ? (
                <Spinner />
              ) : role === "assistant" ? (
                <Markdown>{content}</Markdown>
              ) : (
                <div className="whitespace-pre-line">{content}</div>
              )}
            </div>
            {error && (
              <div
                className={`flex items-center gap-1 text-sm text-error-red ${content && "mt-2"}`}
              >
                <img className="h-5 w-5" src={errorIcon} alt="error" />
                <span>Error generating the response</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export { ChatMessages };
