import React from 'react';
import { socket } from '../socket'

export function ConnectionStatus() {
  const [isConnected, setIsConnected] = React.useState(socket.connected);

  React.useEffect(() => {
    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));
  }, []);

  return (
    <div style={{
      backgroundColor: 'white',
      width: 200,
      height: 50,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontWeight: 'bold',
      borderRadius: 16
    }}>
      {isConnected ? (
        <span style={{ color: 'green' }}>Conectado</span>
      ) : (
        <span style={{ color: 'red' }}>Desconectado</span>
      )}
    </div>
  )
}