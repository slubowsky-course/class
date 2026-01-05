import { useState } from 'react';
import './App.css';
import Header from './Header';
import Recipe from './Recipe';
import RecipeList from './RecipeList';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router';

export default function App() {
  const [id, setId] = useState();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <>
              <Header />
              <Outlet />
            </>
          }>
            <Route index element={<RecipeList />} />
            <Route path="/:id" element={<Recipe />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </BrowserRouter>

      {/*<hr />
      <h1>recipe by entering id in input</h1>

      <input value={id} onChange={e => setId(e.target.value)}/>
      <Recipe id={id} />*/}
    </>
  );
}
