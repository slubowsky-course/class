import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

export default function RecipeList() {
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);

        const response = await fetch('/recipes.json');
        if (!response.ok) {
          throw new Error(`${response.status} - ${response.statusText}`);
        }
        const recipes = await response.json();
        setRecipes(recipes);
      } catch (e) {
        console.error(e);
        setError(e);
      } finally {
        setLoading(false);
      }
    }());
  }, []);

  const recipesJsx = recipes?.map(r => <option key={r.id} value={r.id}>{r.name}</option>);

  const navigate = useNavigate();
  const handleSelectRecipe = e => {
    navigate(`/${e.target.value}`);
  };

  return (
    <>
      {loading && <div>loading...</div>}
      {error && <div style={{color: 'red'}}>{error.message}</div>}
      {recipes && <select id="recipes" onChange={handleSelectRecipe} >
        <option hidden>select a recipe</option>
        {recipesJsx}
      </select>}
    </>
  );
}
