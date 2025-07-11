import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import UserContext from './context/UserContext'
import CaptainContext from './context/CaptainContext'
import SocketProvider from './context/SocketContext.jsx'


createRoot(document.getElementById('root')).render(

  <SocketProvider>
    <CaptainContext>
      <UserContext>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserContext>
    </CaptainContext>
  </SocketProvider>

);
