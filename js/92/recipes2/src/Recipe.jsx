import { useEffect, useState } from "react";
import ListComponent from "./ListComponent";
import { Link, useParams } from 'react-router';

export default function Recipe(props) {
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  //const { id } = useParams();
  const { id } = props;
  const [recipe, setRecipe] = useState();

  useEffect(() => {
    const abortController = new AbortController();

    (async function () {
      try {
        setLoading(true);
        setRecipe();
        setError();

        if (id) {
          const response = await fetch(`/${id}.json`, { signal: abortController.signal });
          if (!response.ok) {
            throw new Error(`${response.status} - ${response.statusText}`);
          }
          const recipe = await response.json();
          setRecipe(recipe);
        }
      } catch (e) {
        if (! e.name === 'AbortError') {
          console.error(e);
          setError(e);
        } else {
          console.log(`fetch of ${id} being canceled`);
        }
      } finally {
        setLoading(false);
      }
    }());

    return () => {
      abortController.abort();
    }
  }, [id]);

  const [pictureShowing, setPictureShowing] = useState(true);

  const { name, picture, ingredients, directions } = recipe ?? {};

  return (
    <>
      {loading && <div>loading...</div>}
      {error && <div style={{ color: 'red' }}>{error.message}</div>}

      {recipe && <div>
        <h2>{name}</h2>
        {pictureShowing && <img src={picture} />}
        <div />
        <button className="primary" onClick={() => setPictureShowing(!pictureShowing)}>{pictureShowing ? 'hide' : 'show'}</button>

        <ListComponent name="ingredients" items={ingredients} />

        <ListComponent name="directions" items={directions} />

      </div>}
    </>
  );
}
