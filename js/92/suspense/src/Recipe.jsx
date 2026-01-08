import { use } from "react";
import { useState } from "react";


export default function Recipe(props) {
  const recipe = use(props.recipePromise);


  const [pictureShowing, setPictureShowing] = useState(true);

  const { name, picture, ingredients, directions } = recipe ?? {};

  return (
    <>
      {recipe && <div>
        <h2>{name}</h2>
        {pictureShowing && <img src={picture} />}
        <div />
        <button className="primary" onClick={() => setPictureShowing(!pictureShowing)}>{pictureShowing ? 'hide' : 'show'}</button>

        {ingredients}
        <br />
        {directions}

      </div>}
    </>
  );
}

export async function recipeLoader(id) {
  try {
    if (id) {
      const response = await fetch(`/${id}.json`);
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }
      return response.json();
    }
  } catch (e) {
    console.error(e);
  }
}
