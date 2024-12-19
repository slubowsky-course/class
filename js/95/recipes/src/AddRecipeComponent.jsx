import { useState } from 'react';
import { PropTypes } from 'prop-types';

export default function AddRecipeComponent(props) {
  const [state, setState] = useState({
    name: 'a',
    picture: 'b',
    ingredients: 'c',
    directions: 'd'
  });

  const handleInputChanged = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const recipe = { ...state };
    recipe.ingredients = recipe.ingredients.split(';');
    recipe.directions = recipe.directions.split(';');
    props.handleAddRecipe(recipe);
  };


  const { name, picture, ingredients, directions } = state;

  return (
    <form className="text-start" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">name: </label>
        <input className="form-control" id="name" name="name" value={name} onChange={handleInputChanged} required minLength="3" />
      </div>
      <div className="form-group">
        <label htmlFor="picture">picture: </label>
        <input className="form-control" id="picture" name="picture" value={picture} onChange={handleInputChanged} />
      </div>
      <div className="form-group">
        <label htmlFor="ingredients">ingredients: </label>
        <input className="form-control" id="ingredients" name="ingredients" value={ingredients} onChange={handleInputChanged} />
      </div>
      <div className="form-group">
        <label htmlFor="directions">directions: </label>
        <input className="form-control" id="directions" name="directions" value={directions} onChange={handleInputChanged} />
      </div>
      <button>add recipe</button>
      <button type="button" onClick={() => props.setShowAddRecipe(false)}>cancel</button>
    </form>
  );
}

AddRecipeComponent.propTypes = {
  handleAddRecipe: PropTypes.func.isRequired,
  setShowAddRecipe: PropTypes.func.isRequired
}
