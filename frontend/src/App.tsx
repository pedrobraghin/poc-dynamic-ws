import './App.css'
import { Chat } from './components/chat';
import { ConnectionStatus } from './components/connection-status'
import { JoinRoom } from './components/join-room';
import { SharedMessage } from './components/shared-message';

function App() {

  return (
    <main style={{
      minHeight: '100vh',
      padding: 16,
    }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 10
        }}
      >
        <ConnectionStatus />
        <JoinRoom />
        <Chat />
        <SharedMessage />
      </div>
    </main>
  )
}

export default App
