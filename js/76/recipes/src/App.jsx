import './App.css';
import Header from './Header';
import NoRecipe from './NoRecipe';
import Recipe from './Recipe';
import { useState, useEffect } from 'react';

export default function App() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('recipes.json');
        if (!response.ok) {
          throw new Error(`${response.status} - ${response.statusText}`);
        }
        const result = await response.json();
        console.log(result);
        setRecipes(result);
      }
      catch (e) {
        console.error('ooops', e);
      }
    })();
  }, []);

  return (
    <>
      <Header />

      {/*<select id="recipes">
        <option hidden>select a recipe</option>
        {recipes?.map(r => <option>{r.name}</option>)}
      </select>*/}
      {recipes.map(r => <button>{r.name}</button>)}

      <NoRecipe />
      <Recipe />

      {JSON.stringify(recipes)}
    </>
  )
}
