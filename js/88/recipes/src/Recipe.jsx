import { useState } from "react";
import ListComponent from "./ListComponent";

export default function Recipe(props) {
  const [pictureShowing, setPictureShowing] = useState(true);

  /*const togglePicture = () => {
    console.log('toggle picture called');
    this.setState({
      pictureShowing: !this.state.pictureShowing
    });
  }*/

  const { name, picture, ingredients, directions } = props.recipe ?? {};

  return (
    <div>
      <h2>{name}</h2>
      {pictureShowing && <img src={picture} />}
      <div />
      <button onClick={() => setPictureShowing(!pictureShowing)}>{pictureShowing ? 'hide' : 'show'}</button>

      <ListComponent name="ingredients" items={ingredients} />

      <ListComponent name="directions" items={directions} />

    </div>
  );
}
