import { useState, useEffect } from 'react';
import Recipe from './Recipe';
import RecipeList from './RecipeList';
import AddRecipeComponent from './AddRecipeComponent';

export default function App() {
  const [state, setState] = useState({
    recipes: [
    ],
    selectedRecipe: 1,
    addingRecipe: false
  });

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch('./recipes.json');
        if (!r.ok) {
          throw new Error(`${r.status} - ${r.statusText}`);
        }
        const recipes = await r.json();
        setState(s => {
          return {
            ...s,
            recipes
          }
        });
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const recipeSelected = index => {
    setState({
      ...state,
      selectedRecipe: index
    });
  }

  const setShowAddRecipe = showing => {
    setState({
      ...state,
      addingRecipe: showing
    });
  };

  const handleAddRecipe = recipe => {
    const { recipes } = state;

    recipe.id = Math.max(...recipes.map(r => r.id)) + 1;

    recipes.push(recipe);
    setState({
      ...state,
      recipes,
      addingRecipe: false
    });
  };

  const { recipes, selectedRecipe } = state;

  const recipeJsx = recipes.length ? <Recipe recipe={recipes[selectedRecipe]} /> : <div>loading...</div>;

  return (
    <div className="container text-center">
      <h1>PCS Recipes</h1>
      <RecipeList recipes={recipes} recipeSelectedHandler={recipeSelected} />
      <button className="btn btn-primary" onClick={() => setShowAddRecipe(true)}>add recipe</button>
      {state.addingRecipe && <AddRecipeComponent handleAddRecipe={handleAddRecipe} setShowAddRecipe={setShowAddRecipe} />}
      <hr />
      {recipeJsx}
    </div>
  );
}
