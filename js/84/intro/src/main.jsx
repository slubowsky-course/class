import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import { StrictMode } from 'react'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/*<h1>{new Date().toLocaleTimeString()}</h1>*/}
  </StrictMode>
);

/*setInterval(() => {
  root.render(
    <>
      <App />
      <h1>{new Date().toLocaleTimeString()}</h1>
    </>
  );
}, 1000);*/
