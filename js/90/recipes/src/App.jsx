import React, { Component } from 'react';
import Recipe from './Recipe';

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

  recipeSelected(index) {
  //recipeSelected = e => {
    //console.log(e);
    this.setState({
      selectedRecipe: index
    });
  }

  render() {
    const { recipes, selectedRecipe } = this.state;

    const recipeListJsx = recipes.length
      ? recipes.map((r, index) => <h2 key={r.id} onClick={
        /*this.recipeSelected.bind(this, index)*/
        () => this.recipeSelected(index)
      }>{r.name}</h2>)
      : <div>loading....</div>;

    const recipeJsx = recipes.length ? <Recipe recipe={recipes[selectedRecipe]} /> : <div>loading...</div>;

    return (
      <div className="container text-center">
        <h1>PCS Recipes</h1>
        <div>{recipeListJsx}</div>
        <hr />
        {recipeJsx}
      </div>
    )
  }
}
