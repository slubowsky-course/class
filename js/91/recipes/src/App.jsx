import { Component } from 'react';
import './App.css';
import Header from './Header';
import Recipe from './Recipe';
import NoRecipe from './NoRecipe';
import RecipeList from './RecipeList';
import AddRecipeComponent from './AddRecipeComponent';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router';
import EditRecipeComponent from './EditRecipeComponent.jsx';
import RecipeRoute from './RecipeRoute.jsx';

export default function App() {
  const [recipes, setRecipes] = useState([]);

  const handleAddRecipe = recipe => {
    recipe.id = Math.max(...recipes.map(r => r.id)) + 1;
    const newRecipes = [...recipes, recipe];
    setRecipes(newRecipes);
  }

  const handleEditRecipe = recipe => {
    const newRecipes = [...recipes];
    newRecipes[newRecipes.findIndex(r => r.id === +recipe.id)] = recipe;
    setRecipes(newRecipes);
  }

  useEffect(() => {
    (async function () {
      try {
        const response = await fetch('/recipes.json');
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
    : <Recipe recipes={recipes} />

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <>
            <Header />
            <Outlet />
          </>
        }>
          <Route index element={<RecipeList recipes={recipes} />} />
          {/*<Route path="/recipe/:id" element={recipe} />
          <Route element={<RecipeFormLayout />} >
            <Route path="/addRecipe" element={<AddRecipeComponent handleAddRecipe={handleAddRecipe} />} />
            <Route path="/editRecipe/:id" element={<EditRecipeComponent handleEditRecipe={handleEditRecipe} recipes={recipes} />} />
          </Route>*/}
          <Route path="/addRecipe" element={<AddRecipeComponent handleAddRecipe={handleAddRecipe} />} />
          <Route path="/:id" element={<RecipeRoute recipes={recipes} />}>
            <Route index element={recipe} />
            <Route path="edit" element={<EditRecipeComponent handleEditRecipe={handleEditRecipe} recipes={recipes} />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
