import Markdown from "react-markdown";
import { Spinner } from "./Spinner";
import userIcon from "../assets/images/user.png";
import errorIcon from "../assets/images/error.png";
import { CHAT_ROLE_ASSISTANT, CHAT_ROLE_USER } from "../types/roles";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  loading?: boolean;
  error?: boolean;
  errorContent?: string;
}

function ChatMessageView({
  role,
  content,
  loading,
  error,
  errorContent,
}: ChatMessageProps) {
  // For the user role, user icon is rendered on the left side of the message, and the message content is rendered on the right side
  // For the assistant role, the message content is rendered as markdown to support markdown format generated by the AI chatbot
  // If error occurs (error is true), error icon and error content are rendered side to side, which is distinct in style
  return (
    <div
      style={{ overflowWrap: "anywhere" }}
      className={`flex items-start gap-4 py-4 px-3 rounded-xl ${role === CHAT_ROLE_USER ? "bg-primary-blue/10" : ""}`}
    >
      {role === CHAT_ROLE_USER && (
        <img
          className="h-[26px] w-[26px] shrink-0"
          src={userIcon}
          alt={CHAT_ROLE_USER}
        />
      )}
      <div>
        <div className="markdown-container">
          {loading && !content ? (
            <Spinner />
          ) : role === CHAT_ROLE_ASSISTANT ? (
            <Markdown>{content}</Markdown>
          ) : (
            <div className="whitespace-pre-line text-left">{content}</div>
          )}
        </div>
        {error && (
          <div
            className={`flex items-center gap-1 text-sm text-error-red ${content && "mt-2"}`}
          >
            <img className="h-5 w-5" src={errorIcon} alt="error" />
            <span>{errorContent}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export { ChatMessageView };
