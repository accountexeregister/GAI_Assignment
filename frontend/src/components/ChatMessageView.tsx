import Markdown from "react-markdown";
import { Spinner } from "./Spinner";
import userIcon from "../assets/images/user.png";
import errorIcon from "../assets/images/error.png";

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
  return (
    <div
      style={{ overflowWrap: "anywhere" }}
      className={`flex items-start gap-4 py-4 px-3 rounded-xl ${role === "user" ? "bg-primary-blue/10" : ""}`}
    >
      {role === "user" && (
        <img className="h-[26px] w-[26px] shrink-0" src={userIcon} alt="user" />
      )}
      <div>
        <div className="markdown-container">
          {loading && !content ? (
            <Spinner />
          ) : role === "assistant" ? (
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
