import { useState } from 'react';
import './AddRecipeComponent.css';
import { useNavigate } from 'react-router';

export default function AddRecipeComponent(props) {
  const [recipe, setRecipe] = useState({
    name: 'a',
    picture: 'b',
    ingredients: 'c',
    directions: 'd'
  });

  const handleChange = e => {
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value
    });
  };

  const navigate = useNavigate();
  const handleSubmit = e => {
    e.preventDefault();

    const newRecipe = { ...recipe, ingredients: recipe.ingredients.split(','), directions: recipe.directions.split(',') }

    props.handleAddRecipe(newRecipe);

    navigate(`/recipe/${newRecipe.id}`, { replace: true });
  };


  const { name, picture, ingredients, directions } = recipe;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name:</label>
        <input value={name} name="name" onChange={handleChange} required minLength={3} />
      </div>
      <div className="form-group">
        <label>Picture:</label>
        <input value={picture} name="picture" onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Ingredients:</label>
        <input value={ingredients} name="ingredients" onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Directions:</label>
        <input value={directions} name="directions" onChange={handleChange} />
      </div>

      <button>add</button>
      <button type="button" onClick={() => navigate('/', { replace: true })}>cancel</button>
    </form>
  )
}
