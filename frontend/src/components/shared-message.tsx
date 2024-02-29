import React from 'react'
import { socket } from '../socket';

export function SharedMessage() {
  const [message, setMessage] = React.useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    socket.emit('shared:message', e.target.value);
  }

  function sendMessage() {
    socket.emit('shared:message', message);
  }

  React.useEffect(() => {
    socket.on('shared:message', (message: string) => {
      setMessage(message);
    });
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}
    >
      <h2>Mensagem compartilhada</h2>
      <div style={{
        display: 'flex',
        gap: 10,
        height: 32,
        fontSize: 12
      }}>
        <input
          type="text"
          value={message}
          onChange={handleChange}
          placeholder='Digite sua mensagem'
          style={{
            borderRadius: 8,
            border: 'none',
            paddingInline: 10,
          }}
        />
        <button onClick={sendMessage}>Enviar</button>
      </div>
      <div>
        <span>{message}</span>
      </div>
    </div>
  )
}