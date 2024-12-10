import Markdown from 'react-markdown';
import { useAutoScroll } from '../hooks/useAutoScroll';
import { Spinner } from './Spinner';
import userIcon from '../assets/images/user.jpg';
import errorIcon from '../assets/images/error.png';
import { ChatMessage } from '../types/ChatMessage';

interface ChatMessagesProps {
    messages: ChatMessage[];
    isLoading: boolean
}

function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  const scrollContentRef = useAutoScroll(isLoading);
  
  return (
    <div ref={scrollContentRef}>
      {messages.map(({ role, content, loading, error }, idx) => (
        <div key={idx}>
          {role === 'user' && (
            <img src={userIcon} alt='user icon' />
          )}
          <div>
            <div>
              {(loading && !content) ? <Spinner />
                : (role === 'assistant')
                  ? <Markdown>{content}</Markdown>
                  : <div>{content}</div>
              }
            </div>
            {error && (
              <div>
                <img src={errorIcon} alt='error icon' />
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