import './Recipe.css';
import ListComponent from './ListComponent';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';

export default function Recipe(props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const [recipe, setRecipe] = useState();
  const { id } = useParams();
  //const { id } = props;
  console.log(id);

  //const { recipes } = props;
  //const recipe = recipes.find(r => r.id == id);
  useEffect(() => {
    (async () => {
      setRecipe();
      setError();
      setLoading(true);
      try {
        const r = await fetch(`/${id}.json`);
        if (!r.ok) {
          throw new Error(`${r.status} - ${r.statusText}`);
        }
        const recipe = await r.json();
        setRecipe(recipe);
      } catch (e) {
        console.error(e);
        setError(e);
      }

      setLoading(false);
    })();
  }, [id]);

  const [pictureShowing, setPictureShowing] = useState(true);

  const { name, ingredients, directions, picture } = recipe || {};

  return (
    <>
      {loading && <h2>loading...</h2>}
      {error && <h2>oops - failed to load recipe {id}.</h2>}
      {recipe && <>
        <h2>{name}</h2>
        {pictureShowing ? <img src={picture} /> : null}
        <br />
        <button className="btn btn-primary" onClick={() => setPictureShowing(!pictureShowing)}>{pictureShowing ? 'hide picture' : 'show picture'}</button>
        <ListComponent name="ingredients" list={ingredients} />
        <ListComponent name="directions" list={directions} />
      </>}
    </>
  );
}
