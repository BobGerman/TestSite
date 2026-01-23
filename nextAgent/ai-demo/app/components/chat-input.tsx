import { useState } from 'react';

export default function ChatInput({
  status,
  onSubmit,
  stop,
}: {
  status: string;
  onSubmit: (text: string) => void;
  stop?: () => void;
}) {  
  const [text, setText] = useState('');

  // TODO: Remove this debug log in production
  console.log ('ChatInput status:', status);
  
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        if (text.trim() === '') return;
        onSubmit(text);
        setText('');
      }}
    >
      <input
        placeholder="Say something..."
        disabled={status !== 'ready'}
        value={text}
        onChange={e => setText(e.target.value)}
      />
      {(status === 'ready' ) && (
        <button
          type="submit"
        >
          Send
        </button>
      )}
      {stop && (status === 'streaming' || status === 'submitted') && (
        <button
          type="submit"
          onClick={stop}
        >
          Stop
        </button>
      )}
    </form>
  );
}