import { useNavigate, useOutletContext } from 'react-router';
import RecipeForm from './RecipeForm.jsx';

export default function EditRecipeComponent(props) {
  const recipe = useOutletContext();

  const navigate = useNavigate();
  const handleSubmit = (e, recipe) => {
    e.preventDefault();

    const newRecipe = { ...recipe, ingredients: recipe.ingredients.split(','), directions: recipe.directions.split(',') }

    props.handleEditRecipe(newRecipe);

    navigate(`/recipe/${newRecipe.id}`, { replace: true });
  };

  return (
    <>
      <h2>Edit Recipe</h2>
      <RecipeForm onSubmit={handleSubmit} action="Edit" recipe={recipe} />
    </>
  );
}
