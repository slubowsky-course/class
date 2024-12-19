import { Link } from 'react-router';
import { useState, useEffect } from 'react';

export default function RecipeList() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError();
        setRecipes();
        const r = await fetch('./recipes.json');
        if (!r.ok) {
          throw new Error(`${r.status} - ${r.statusText}`);
        }
        const recipes = await r.json();
        setRecipes(recipes);
      } catch (e) {
        console.error(e);
        setError(e);
      }

      setLoading(false);
    })();
  }, []);

  return (
    <>
      {loading && <h2>loading...</h2>}
      {error && <h2>oops - failed to load recipes.</h2>}
      {recipes && recipes.map(r => <h2 key={r.id}><Link to={`/recipe/${r.id}`}>{r.name}</Link></h2>)}
    </>
  )
}
