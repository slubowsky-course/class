import './App.css';
import Header from './Header';
import NoRecipe from './NoRecipe';
import Recipe from './Recipe';
import { useState, useEffect } from 'react';
import RecipeList from './RecipeList';
import AddRecipe from './AddRecipe';
import FilteredItems from './FilteredItems';

export default function App() {
  const [recipes, setRecipes] = useState();
  const [selectedRecipe, setSelectedRecipe] = useState(0);
  const [addingRecipe, setAddingRecipe] = useState();

  const handleAddRecipe = newRecipe => {
    // recipes.push(newRecipe);
    // setRecipes(recipes);

    setRecipes([...recipes, newRecipe]);

    setAddingRecipe(false);
  }

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
      <FilteredItems />

      <Header />

      {/*<select id="recipes" value={selectedRecipe} onChange={e => setSelectedRecipe(e.target.value) }>
        <option hidden>select a recipe</option>
        {recipes?.map((r, index) => <option key={/*r.id* /index} value={index}>{r.name}</option>)}
      </select>*/}

      <RecipeList recipes={recipes} selectedRecipe={selectedRecipe} onSelectRecipe={setSelectedRecipe} />

      {!addingRecipe
        ? <button onClick={() => setAddingRecipe(!addingRecipe)}>add recipe</button>
        : <AddRecipe onAddingRecipe={handleAddRecipe} />}

      {recipes
        ? <Recipe recipe={recipes[selectedRecipe] ?? {}} />
        : <NoRecipe />}

    </>
  )
}
