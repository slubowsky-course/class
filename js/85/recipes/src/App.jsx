import { Component } from 'react';
import './App.css';
import Header from './Header';
import Recipe from './Recipe';
import NoRecipe from './NoRecipe';

class App extends Component {
  state = {
    recipes: [],
    selectedRecipe: 1
  }

  constructor() {
    super();

    this.selectRecipe = this.selectRecipe.bind(this);
  }

  async componentDidMount() {
    try {
      const response = await fetch('recipes.json');
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }
      const recipes = await response.json();
      console.log(recipes);

      this.setState({
        recipes
      });

    } catch (e) {
      console.error(e);
    }

    /*this.interval = setInterval(() => {

      this.setState({
        selectedRecipe: this.state.selectedRecipe ? 0 : 1
      })
    }, 5000);*/
  }

  componentWillUnmount() {
    // clearInterval(this.interval);
  }

  selectRecipe(index) {
    // console.log(e.target.value);

    //selectRecipe = () => {
    this.setState({
      selectedRecipe: index
    });
  }

  render() {
    const { recipes, selectedRecipe } = this.state;

    /*const recipesJsx = recipes?.map(r => <option key={r.id} value={r.id}>{r.name}</option>);*/

    const recipesJsx = recipes?.map((r, index) => <button onClick={
      /*this.selectRecipe*/
      /*this.selectRecipe.bind(this, index)*/
      () => this.selectRecipe(index)
    } key={r.id} value={r.id}>{r.name}</button>);

    const recipe = !recipes.length
      ? <NoRecipe />
      : <Recipe recipe={recipes[selectedRecipe]} />

    return (
      <>
        <Header />
        {/*<select id="recipes" onChange={this.selectRecipe}>
          <option hidden>select a recipe</option>
          {recipesJsx}
        </select>*/}
        {recipesJsx}

        {recipe}
      </>
    );
  }
}

export default App
