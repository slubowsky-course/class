import './AddRecipe.css';
import React from 'react'

export default function AddRecipe({ onAddingRecipe }) {

  const handleSubmit = e => {
    e.preventDefault();
    const newRecipe = Object.fromEntries(new FormData(e.target).entries());
    newRecipe.ingredients = newRecipe.ingredients.split(',');
    onAddingRecipe(newRecipe);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div><strong>add recipe</strong></div>

      <label>
        name: <input required name="name" />
      </label>
      <label>
        picture: <input name="picture" />
      </label>
      <label>
        ingredients: <input name="ingredients" />
      </label>

      <button>add</button>
    </form>
  )
}
