import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import RecipeList from './RecipeList';
import Recipe from './Recipe';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index={true} element={<RecipeList />} />
          <Route path="/recipe/:id" element={<Recipe />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes >
    </BrowserRouter >
  </StrictMode >
);

{/*<input value={id} onChange={handleIdChange} />
      <Recipe id={id} />*/}
