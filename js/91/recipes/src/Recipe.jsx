import { useState } from "react";
import ListComponent from "./ListComponent";
import { Link, useOutletContext } from 'react-router';

export default function Recipe() {
  const recipe = useOutletContext();

  const [pictureShowing, setPictureShowing] = useState(true);

  /*const togglePicture = () => {
    console.log('toggle picture called');
    this.setState({
      pictureShowing: !this.state.pictureShowing
    });
  }*/

  const { name, picture, ingredients, directions } = recipe ?? {};

  return (
    <div>
      <h2>{name} <button><Link to={`/${recipe.id}/edit`}>edit</Link></button></h2>
      {pictureShowing && <img src={picture} />}
      <div />
      <button className="primary" onClick={() => setPictureShowing(!pictureShowing)}>{pictureShowing ? 'hide' : 'show'}</button>

      <ListComponent name="ingredients" items={ingredients} />

      <ListComponent name="directions" items={directions} />

    </div>
  );
}
