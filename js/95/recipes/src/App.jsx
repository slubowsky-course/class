import Recipe from './Recipe';
import RecipeList from './RecipeList';
import { BrowserRouter, Routes, Route, Outlet, Link } from 'react-router';
import { useState } from 'react';
import Header from './Header';

export default function App() {
  /*const [id, setId] = useState(1);

  const handleIdChange = e => {
    setId(e.target.value);
  }*/

  return (
      <div className="container text-center">
        <Header />
        <hr />
        <Outlet />
      </div>


  );
}
