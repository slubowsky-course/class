import { useNavigate } from 'react-router';
import RecipeForm from './RecipeForm.jsx';

export default function AddRecipeComponent(props) {

  const navigate = useNavigate();
  const handleSubmit = (e, recipe) => {
    e.preventDefault();

    const newRecipe = { ...recipe, ingredients: recipe.ingredients.split(','), directions: recipe.directions.split(',') }

    props.handleAddRecipe(newRecipe);

    navigate(`/recipe/${newRecipe.id}`, { replace: true });
  };

  return (
    <>
      <h2>Add Recipe</h2>
      <RecipeForm onSubmit={handleSubmit} action="Add" />
    </>
  );
}
