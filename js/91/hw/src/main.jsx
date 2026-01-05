import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import Sell from './Sell.jsx';
import Buy from './Buy.jsx';
import Home from './Home.jsx';
import NoPageFound from './NoPageFound.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="*" element={<NoPageFound />} />

          {/*<Route path="*" element={<App />}/>*/}
        </Route>

      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
