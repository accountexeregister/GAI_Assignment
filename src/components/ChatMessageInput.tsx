import { useAutosize } from '../hooks/useAutosize';
import sendIcon from '../assets/images/send.png';

interface ChatMessageInput {
    newMessage: string;
    isLoading: boolean;
    setNewMessage: (newMessage: string) => void;
    submitNewMessage: () => Promise<void>;
}

function ChatMessageInput({ newMessage, isLoading, setNewMessage, submitNewMessage }: ChatMessageInput) {
  const textareaRef = useAutosize(newMessage);

  function handleKeyDown(e: React.KeyboardEvent) {
    if(e.key === 'Enter' && !e.shiftKey && !isLoading) {
      e.preventDefault();
      submitNewMessage();
    }
  }
  
  return(
    <div>
      <textarea
        ref={textareaRef}
        rows={1}
        value={newMessage}
        onChange={e => setNewMessage(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={submitNewMessage}>
        <img src={sendIcon} alt='send' />
      </button>
    </div>
  );
}

export { ChatMessageInput };