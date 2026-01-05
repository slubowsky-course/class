import React, { useState } from 'react'
import { Navigate } from 'react-router';
import style from './RecipeForm.module.css';

export default function RecipeForm(props) {
  const [recipe, setRecipe] = useState(props.recipe ? { ...props.recipe, ingredients: props.recipe.ingredients.join(','), directions: props.recipe.directions.join(',') } : {
    name: '',
    picture: '',
    ingredients: '',
    directions: ''
  });

  const handleChange = e => {
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value
    });
  };

  const { name, picture, ingredients, directions } = recipe;

  return (
    <form onSubmit={e => props.onSubmit(e, recipe)}>
      <div className={style.formGroup}>
        <label>Name:</label>
        <input value={name} name="name" onChange={handleChange} required minLength={3} />
      </div>
      <div className={style.formGroup}>
        <label>Picture:</label>
        <input value={picture} name="picture" onChange={handleChange} />
      </div>
      <div className={style.formGroup}>
        <label>Ingredients:</label>
        <input value={ingredients} name="ingredients" onChange={handleChange} />
      </div>
      <div className={style.formGroup}>
        <label>Directions:</label>
        <input value={directions} name="directions" onChange={handleChange} />
      </div>

      <button className={style.primary}>{props.action}</button>
      <button className={style.secondary} type="button" onClick={() => Navigate('/', { replace: true })}>cancel</button>
    </form>
  )
}
