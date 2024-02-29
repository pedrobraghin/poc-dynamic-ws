import React from 'react'
import { socket } from '../socket';

export function Chat() {
  const [messages, setMessages] = React.useState<string[]>([]);

  React.useEffect(() => {
    socket.on('message', (message: string) => {
      setMessages(prev => [...prev, message]);
    });
  }, []);

  return (
    <div>
      <h2>Chat - Mensagens</h2>
      <div>
        {messages.map((message) => <span>{message}</span>)}
      </div>
    </div>
  )
}