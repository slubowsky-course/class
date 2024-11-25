import './Recipe.css';
import React from 'react';

export default function Recipe(props) {
  const { name, ingredients, directions } = props.recipe;
  return (
    <>
      <h2>{name}</h2>
      <h5>ingredients</h5>
      <ul>
        {ingredients.map(i => <li>{i}</li>)}
      </ul>
      <h5>directions</h5>
      <ul>
        {directions.map(d => <li>{d}</li>)}
      </ul>
    </>
  )
}
