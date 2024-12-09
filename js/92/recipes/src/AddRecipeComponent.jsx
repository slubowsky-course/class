import { Component } from 'react';
import {PropTypes} from 'prop-types';

export default class AddRecipeComponent extends Component {
  state = {
    name: '',
    picture: '',
    ingredients: '',
    directions: ''
  }

  handleInputChanged = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  handleSubmit = e => {
    e.preventDefault();
    const recipe = { ...this.state };
    recipe.ingredients = recipe.ingredients.split(';');
    recipe.directions = recipe.directions.split(';');
    this.props.handleAddRecipe(recipe);
  };

  render() {
    const { name, picture, ingredients, directions } = this.state;

    return (
      <form className="text-start" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">name: </label>
          <input className="form-control" id="name" name="name" value={name} onChange={this.handleInputChanged} required minLength="3" />
        </div>
        <div className="form-group">
          <label htmlFor="picture">picture: </label>
          <input className="form-control" id="picture" name="picture" value={picture} onChange={this.handleInputChanged} />
        </div>
        <div className="form-group">
          <label htmlFor="ingredients">ingredients: </label>
          <input className="form-control" id="ingredients" name="ingredients" value={ingredients} onChange={this.handleInputChanged} />
        </div>
        <div className="form-group">
          <label htmlFor="directions">directions: </label>
          <input className="form-control" id="directions" name="directions" value={directions} onChange={this.handleInputChanged} />
        </div>
        <button>add recipe</button>
        <button type="button" onClick={() => this.props.setShowAddRecipe(false)}>cancel</button>
      </form>
    )
  }
}

AddRecipeComponent.propTypes = {
  handleAddRecipe: PropTypes.func.isRequired,
  setShowAddRecipe: PropTypes.func.isRequired
}
