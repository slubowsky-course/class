//import { useEffect, useState } from 'react'
import './App.css';
//import useForm from './useForm';
//import useLocalStorage from './useLocalStorage';
import useFormLocalStorage from './useFormLocalStorage';

export default function App() {

  /*const [state, setState] = useState(JSON.parse(localStorage.getItem('options')) ?? {
    color: '#FF0000',
    backgroundColor: '#00FF00',
    fontFamily: 'cursive'
  });*/

  /*const [state, setState] = useLocalStorage('options', {
    color: '#FF0000',
    backgroundColor: '#00FF00',
    fontFamily: 'cursive'
  });*/

  const [state, setState] = useFormLocalStorage('options', {
    color: '#FF0000',
    backgroundColor: '#00FF00',
    fontFamily: 'cursive'
  });

  /*const handleChange = e => {
    const newState = {
      ...state,
      [e.target.name]: e.target.value
    };

    setState(newState);

    // localStorage.setItem('options', JSON.stringify(newState));
  };*/

  /*useEffect(() => {
    localStorage.setItem('options', JSON.stringify(state));
  }, [state]);*/

  /*const [state, setState] = useForm({
    color: '#FF0000',
    backgroundColor: '#00FF00',
    fontFamily: 'cursive'
  });*/

  return (
    <div style={state}>
      <p id="foo">Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi adipisci nobis non quidem culpa, maxime id laboriosam dolores voluptates, blanditiis assumenda libero corporis. Blanditiis alias quia consectetur pariatur. Sunt hic cum doloremque porro labore non natus ullam molestiae voluptas quos consequuntur deleniti nobis tempore perspiciatis distinctio nisi libero quia error magni ea exercitationem, eum, neque accusantium! Qui dolor aut earum ullam, laudantium possimus quidem vel at ipsa illum unde aperiam, assumenda quaerat voluptates sint totam non cumque nostrum consequuntur fugit officiis soluta rem, tenetur facilis. Molestiae quis harum, eos ipsum inventore voluptates ea cupiditate veniam architecto delectus aspernatur, sint perspiciatis.</p>
      <form>
        color: <input type="color" value={state.color} name="color" onChange={/*handleChange*/setState}/>
        background color: <input type="color" value={state.backgroundColor} name="backgroundColor" onChange={/*handleChange*/setState} />
        font: <select value={state.fontFamily} name="fontFamily" onChange={/*handleChange*/setState}>
          <option>serif</option>
          <option>sans-serif</option>
          <option>cursive</option>
          <option>monospace</option>
          <option>fantasy</option>
        </select>
      </form>
    </div>
  );

  /*const [color, setColor] = useState('#FF0000');
  const [backgroundColor, setBackgroundColor] = useState('#00FF00');
  const [fontFamily, setFontFamily] = useState('cursive');

  const handleColorChange = e => {
    setColor(e.target.value);
  };

  const handleBackgroundColorChange = e => {
    setBackgroundColor(e.target.value);
  };

  const handleFontChange = e => {
    setFontFamily(e.target.value);
  };

  return (
    <div style={{
      color,
      backgroundColor,
      fontFamily
    }}>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi adipisci nobis non quidem culpa, maxime id laboriosam dolores voluptates, blanditiis assumenda libero corporis. Blanditiis alias quia consectetur pariatur. Sunt hic cum doloremque porro labore non natus ullam molestiae voluptas quos consequuntur deleniti nobis tempore perspiciatis distinctio nisi libero quia error magni ea exercitationem, eum, neque accusantium! Qui dolor aut earum ullam, laudantium possimus quidem vel at ipsa illum unde aperiam, assumenda quaerat voluptates sint totam non cumque nostrum consequuntur fugit officiis soluta rem, tenetur facilis. Molestiae quis harum, eos ipsum inventore voluptates ea cupiditate veniam architecto delectus aspernatur, sint perspiciatis.</p>
      <form>
        color: <input type="color" value={color} name="color" onChange={handleColorChange} />
        background color: <input type="color" value={backgroundColor} name="backgroundColor" onChange={handleBackgroundColorChange} />
        font: <select value={fontFamily} name="fontFamily" onChange={handleFontChange}>
          <option>serif</option>
          <option>sans-serif</option>
          <option>cursive</option>
          <option>monospace</option>
          <option>fantasy</option>
        </select>
      </form>
    </div>
  );*/
}
