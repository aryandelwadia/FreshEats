import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster toastOptions={{
        className: '',
        style: {
          padding: '10px',
          color: 'white',
          backgroundColor: "#1a1a1a",
          backdropFilter: "blur(20px)",
          borderRadius: "16px"
        },
      }} />
    </BrowserRouter>
  </React.StrictMode>,
)
