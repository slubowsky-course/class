import { Component } from 'react';
import './App.css';
import Header from './Header';
import Recipe from './Recipe';
import NoRecipe from './NoRecipe';
import RecipeList from './RecipeList';
import AddRecipeComponent from './AddRecipeComponent';
import { useState, useEffect } from 'react';

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(1);
  const [addingRecipe, setAddingRecipe] = useState(false);

  const handleAddRecipe = recipe => {
    recipe.id = Math.max(...recipes.map(r => r.id)) + 1;
    const newRecipes = [...recipes, recipe];
    setRecipes(newRecipes);

    /*recipes.push(recipe);
    setRecipes(recipes);*/


    setAddingRecipe(false);
  }

  const selectRecipe = e => {
    setSelectedRecipe(e.target.value);
  }

  useEffect(() => {
    (async function () {
      try {
        const response = await fetch('recipes.json');
        if (!response.ok) {
          throw new Error(`${response.status} - ${response.statusText}`);
        }
        const recipes = await response.json();
        setRecipes(recipes);

      } catch (e) {
        console.error(e);
      }
    }());
  }, []);

  const recipe = !recipes.length
    ? <NoRecipe />
    : <Recipe recipe={recipes[selectedRecipe]} />

  return (
    <>
      <Header />

      <RecipeList recipes={recipes} selectedRecipe={selectedRecipe} selectRecipe={selectRecipe} />

      <button onClick={() => setAddingRecipe(true)} >add recipe</button>

      {addingRecipe ? <AddRecipeComponent handleAddRecipe={handleAddRecipe} /> : null}

      {recipe}
    </>
  );
}
