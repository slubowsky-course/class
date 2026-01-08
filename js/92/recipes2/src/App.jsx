import { useState } from 'react';
import './App.css';
import Header from './Header';
import {Outlet} from 'react-router';
import Recipe from './Recipe.jsx';

export default function App() {
  const [id, setId] = useState();

  return (
    <>
      <Header />
      <Outlet />

      <hr />
      <h1>recipe by entering id in input</h1>

      <input value={id} onChange={e => setId(e.target.value)}/>
      <Recipe id={id} />
    </>
  );
}
