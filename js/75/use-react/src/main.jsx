import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const root = createRoot(document.querySelector('#root'))

//setInterval(() => {
  root.render(
    <StrictMode>
      <App />
      <h1>{new Date().toLocaleTimeString()}</h1>
    </StrictMode>,
  );
//}, 1000);
