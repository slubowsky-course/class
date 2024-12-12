import {PropTypes} from 'prop-types';

export default function RecipeList(props) {
  const { recipes, recipeSelectedHandler } = props;
  return (
    recipes.length
      ? recipes.map((r, index) => <h2 key={r.id} onClick={
        () => recipeSelectedHandler(index)
      }>{r.name}</h2>)
      : <div>loading....</div>
  )
}

RecipeList.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  })).isRequired,
  recipeSelectedHandler: PropTypes.func.isRequired
}
