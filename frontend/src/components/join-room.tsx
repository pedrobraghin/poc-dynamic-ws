import React, { ElementRef } from 'react'
import { socket } from '../socket';


export function JoinRoom() {
  const inputRef = React.useRef<(ElementRef<'input'>)>(null);

  const joinRoom = React.useCallback(() => {
    const id = inputRef.current?.value;

    if (!id) return;

    socket.emit('join:room', id);
  }, []);

  return (
    <div style={{
      display: 'flex',
      gap: 10,
      height: 'max-content'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label htmlFor="room-id">ID da sala</label>
        <input
          type="text"
          name="room-id"
          id="room-id"
          ref={inputRef}
          placeholder='Ex.: 123'
          style={{
            borderRadius: 8,
            border: 'none',
            paddingInline: 10,
            height: 32,
          }}
        />
      </div>
      <button onClick={joinRoom}>Entrar</button>
    </div>
  )
}