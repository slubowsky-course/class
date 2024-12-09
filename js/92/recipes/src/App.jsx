import React, { Component } from 'react';
import Recipe from './Recipe';
import RecipeList from './RecipeList';
import AddRecipeComponent from './AddRecipeComponent';

export default class App extends Component {
  /*state = {
    recipes: [],
    selectedRecipe: 1
  }*/

  constructor(props) {
    super(props);

    this.state = {
      recipes: [],
      selectedRecipe: 1
    };

    // this.recipeSelected = this.recipeSelected.bind(this);
  }

  async componentDidMount() {
    try {
      const r = await fetch('./recipes.json');
      if (!r.ok) {
        throw new Error(`${r.status} - ${r.statusText}`);
      }
      const recipes = await r.json();
      this.setState({
        recipes
      });
    } catch (e) {
      console.error(e);
    }
  }

  recipeSelected = index => {
  //recipeSelected = e => {
    //console.log(e);
    this.setState({
      selectedRecipe: index
    });
  }

  setShowAddRecipe = showing => {
    this.setState({
      addingRecipe: showing
    })
  };

  handleAddRecipe = recipe => {
    const {recipes} = this.state;

    recipe.id = Math.max(...recipes.map(r => r.id)) + 1;

    recipes.push(recipe);
    this.setState({
      recipes,
      addingRecipe: false
    });
  };

  render() {
    const { recipes, selectedRecipe } = this.state;

    const recipeJsx = recipes.length ? <Recipe recipe={recipes[selectedRecipe]} /> : <div>loading...</div>;

    return (
      <div className="container text-center">
        <h1>PCS Recipes</h1>
        <RecipeList recipes={recipes} recipeSelectedHandler={this.recipeSelected}/>
        <button className="btn btn-primary" onClick={() => this.setShowAddRecipe(true)}>add recipe</button>
        {this.state.addingRecipe && <AddRecipeComponent handleAddRecipe={this.handleAddRecipe} setShowAddRecipe={this.setShowAddRecipe} />}
        <hr />
        {recipeJsx}
      </div>
    )
  }
}
