import { useEffect, useState } from 'react';
import './App.css'
import Greeting from './Greeting';
import FilteredItems from './FilteredItems';
import useForm from './useForm';
import Form2 from './Form2';
import useLocalStorage from './useLocalStorage';
import Form3 from './Form3';

/*export default function App() {

  const [color, setColor] = useState('#FF0000');
  const [backgroundColor, setBackgroundColor] = useState('#00FF00');
  const [fontFamily, setFontFamily] = useState('cursive');

  return (
    <div style={{ color, backgroundColor, fontFamily }}>
      <label>color:
        <input type="color" value={color} onChange={e => setColor(e.target.value)} />
      </label>

      <label>background color:
        <input type="color" value={backgroundColor} onChange={e => setBackgroundColor(e.target.value)} />
      </label>

      <label>font
        <select value={fontFamily} onChange={e => setFontFamily(e.target.value)}>
          <option>serif</option>
          <option>sans-serif</option>
          <option>cursive</option>
          <option>fantasy</option>
          <option>monospace</option>
        </select>
      </label>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas adipisci deserunt labore et nihil, soluta cumque voluptas accusantium maxime voluptate distinctio aspernatur corporis fugiat dicta molestiae neque rerum aut. Perferendis quis reiciendis nobis aperiam architecto itaque. Totam dolorum accusantium dolorem quis consectetur vitae voluptate optio, velit, consequatur repellendus debitis dolores nemo iure quas aut recusandae est, voluptatem cum! Culpa unde labore enim exercitationem, porro debitis architecto quod minus! Facere harum corporis placeat dolorum, soluta maxime, tempore quibusdam quisquam enim fuga excepturi omnis quae voluptates itaque dignissimos officia laborum aperiam aut distinctio aliquid. Quisquam quam numquam aliquid sunt debitis quos adipisci et optio perspiciatis minus facilis suscipit quae reprehenderit, pariatur eveniet id blanditiis, similique molestias voluptatibus maiores eaque. Culpa quis molestiae, a dolor enim cupiditate omnis unde eum sunt in doloribus, id provident inventore explicabo libero, veniam numquam sed. Fuga nam delectus necessitatibus veniam, animi tenetur autem odio laboriosam deleniti soluta? Sint similique quae officiis, in at perferendis laudantium quasi tenetur esse cumque explicabo impedit qui rem fuga expedita ab itaque molestiae consequatur adipisci vero eos consectetur perspiciatis. Minus adipisci in quam error perspiciatis. Odit quasi optio perferendis facilis fuga dolorum inventore, molestiae eos atque est delectus laudantium iure possimus adipisci impedit ex esse ipsum quisquam reprehenderit asperiores neque. Placeat sit vero at dolorem iste quidem. Numquam repellat voluptatem aut quam ducimus praesentium. Nulla dolor temporibus quia commodi inventore! Similique debitis optio magnam dignissimos officia asperiores quas nostrum, odit labore ipsum obcaecati ad. Officia vel expedita ex, et doloribus recusandae eligendi reprehenderit minima iusto voluptate ab dolores accusamus ducimus, repellendus hic maxime facere labore animi nobis? Quod assumenda quibusdam corporis debitis ipsam totam nam aspernatur laboriosam possimus in repellendus fuga ducimus voluptatem sequi, corrupti, sed nostrum molestiae libero perspiciatis architecto ullam quisquam. Deserunt ab dolor impedit possimus enim cum eligendi sequi atque, dolores sint nesciunt inventore blanditiis labore officiis fuga animi at velit sunt quidem iusto modi odio repellat, laudantium soluta? Recusandae ipsa dolorem blanditiis veritatis maxime mollitia, et corporis nemo cum sit odio nostrum, odit officiis at quisquam maiores earum sed, facilis alias sint! Molestias neque cumque modi facere facilis. Consectetur iusto placeat ipsam mollitia itaque veniam. Illum maxime esse asperiores, cumque aut ipsum nemo veritatis. Dignissimos, magnam expedita. Porro sunt doloremque officiis necessitatibus, pariatur veniam, dolorum error officia accusamus ipsam dolor iusto saepe excepturi. Soluta vel ducimus assumenda sit ex cumque inventore officiis labore, aperiam quisquam ullam reiciendis temporibus dolores quae saepe nobis sapiente. Vitae quasi odio, ad placeat accusamus, facilis minus maxime laudantium aut neque repellendus sequi doloribus expedita quas sunt, libero atque magnam! Sed placeat aperiam officiis. Aperiam labore culpa illo maxime sint itaque autem officia distinctio quis? Possimus, dignissimos quaerat in consectetur nesciunt nostrum atque mollitia. At vel repellat corporis voluptatem libero vero ad non facilis nam dicta porro hic quidem, ratione id aliquid odit aperiam numquam distinctio illo ipsa cum amet quaerat quae nemo! Eos qui natus minus, quae debitis minima nihil animi aperiam non vitae assumenda cupiditate reprehenderit dolor similique delectus cum doloribus ullam.</p>
    </div>
  )
}*/

export default function App() {

  /*const [state, setState] = useState(JSON.parse(localStorage.getItem('options')) ?? {
    color: '#FF0000',
    backgroundColor: '#00FF00',
    fontFamily: 'cursive'
  });*/

  /*const [state, setState] = useForm({
    color: '#FF0000',
    backgroundColor: '#00FF00',
    fontFamily: 'cursive'
  });*/

  const [state, setState] = useLocalStorage('options', {
    color: '#FF0000',
    backgroundColor: '#00FF00',
    fontFamily: 'cursive'
  });

  const handleChange = e => {
    const newState = {
      ...state,
      [e.target.name]: e.target.value
    };

    setState(newState);

    //localStorage.setItem('options', JSON.stringify(newState));
  }

  /*useEffect(() => {
    localStorage.setItem('options', JSON.stringify(state));
  }, [state]);*/

  const { color, backgroundColor, fontFamily } = state;

  return (
    <div style={state}>
      <Form3 />
      <hr />
      <Form2 />
      <hr />
      <label>color:
        <input type="color" value={color} onChange={handleChange/*setState*/} name="color" />
      </label>

      <label>background color:
        <input type="color" value={backgroundColor} onChange={handleChange/*setState*/} name="backgroundColor" />
      </label>

      <label>font
        <select value={fontFamily} onChange={handleChange/*setState*/} name="fontFamily">
          <option>serif</option>
          <option>sans-serif</option>
          <option>cursive</option>
          <option>fantasy</option>
          <option>monospace</option>
        </select>
      </label>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas adipisci deserunt labore et nihil, soluta cumque voluptas accusantium maxime voluptate distinctio aspernatur corporis fugiat dicta molestiae neque rerum aut. Perferendis quis reiciendis nobis aperiam architecto itaque. Totam dolorum accusantium dolorem quis consectetur vitae voluptate optio, velit, consequatur repellendus debitis dolores nemo iure quas aut recusandae est, voluptatem cum! Culpa unde labore enim exercitationem, porro debitis architecto quod minus! Facere harum corporis placeat dolorum, soluta maxime, tempore quibusdam quisquam enim fuga excepturi omnis quae voluptates itaque dignissimos officia laborum aperiam aut distinctio aliquid. Quisquam quam numquam aliquid sunt debitis quos adipisci et optio perspiciatis minus facilis suscipit quae reprehenderit, pariatur eveniet id blanditiis, similique molestias voluptatibus maiores eaque. Culpa quis molestiae, a dolor enim cupiditate omnis unde eum sunt in doloribus, id provident inventore explicabo libero, veniam numquam sed. Fuga nam delectus necessitatibus veniam, animi tenetur autem odio laboriosam deleniti soluta? Sint similique quae officiis, in at perferendis laudantium quasi tenetur esse cumque explicabo impedit qui rem fuga expedita ab itaque molestiae consequatur adipisci vero eos consectetur perspiciatis. Minus adipisci in quam error perspiciatis. Odit quasi optio perferendis facilis fuga dolorum inventore, molestiae eos atque est delectus laudantium iure possimus adipisci impedit ex esse ipsum quisquam reprehenderit asperiores neque. Placeat sit vero at dolorem iste quidem. Numquam repellat voluptatem aut quam ducimus praesentium. Nulla dolor temporibus quia commodi inventore! Similique debitis optio magnam dignissimos officia asperiores quas nostrum, odit labore ipsum obcaecati ad. Officia vel expedita ex, et doloribus recusandae eligendi reprehenderit minima iusto voluptate ab dolores accusamus ducimus, repellendus hic maxime facere labore animi nobis? Quod assumenda quibusdam corporis debitis ipsam totam nam aspernatur laboriosam possimus in repellendus fuga ducimus voluptatem sequi, corrupti, sed nostrum molestiae libero perspiciatis architecto ullam quisquam. Deserunt ab dolor impedit possimus enim cum eligendi sequi atque, dolores sint nesciunt inventore blanditiis labore officiis fuga animi at velit sunt quidem iusto modi odio repellat, laudantium soluta? Recusandae ipsa dolorem blanditiis veritatis maxime mollitia, et corporis nemo cum sit odio nostrum, odit officiis at quisquam maiores earum sed, facilis alias sint! Molestias neque cumque modi facere facilis. Consectetur iusto placeat ipsam mollitia itaque veniam. Illum maxime esse asperiores, cumque aut ipsum nemo veritatis. Dignissimos, magnam expedita. Porro sunt doloremque officiis necessitatibus, pariatur veniam, dolorum error officia accusamus ipsam dolor iusto saepe excepturi. Soluta vel ducimus assumenda sit ex cumque inventore officiis labore, aperiam quisquam ullam reiciendis temporibus dolores quae saepe nobis sapiente. Vitae quasi odio, ad placeat accusamus, facilis minus maxime laudantium aut neque repellendus sequi doloribus expedita quas sunt, libero atque magnam! Sed placeat aperiam officiis. Aperiam labore culpa illo maxime sint itaque autem officia distinctio quis? Possimus, dignissimos quaerat in consectetur nesciunt nostrum atque mollitia. At vel repellat corporis voluptatem libero vero ad non facilis nam dicta porro hic quidem, ratione id aliquid odit aperiam numquam distinctio illo ipsa cum amet quaerat quae nemo! Eos qui natus minus, quae debitis minima nihil animi aperiam non vitae assumenda cupiditate reprehenderit dolor similique delectus cum doloribus ullam.</p>
    </div>
  );
}

/*export default function App() {
  const [foo, setFoo] = useState(1);
  const [state, setState] = useState({
    color: '#FF0000',
    backgroundColor: '#00FF00',
    fontFamily: 'cursive'
  });

  const [uiState, setUiState] = useState(state);

  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  }

  const { color, backgroundColor, fontFamily } = state;

  return (
    <>
      <FilteredItems />
      <Greeting name={foo} />
      <form style={uiState} onSubmit={e => {
        e.preventDefault();
        setUiState({ ...state });
      }}>
        <button type="button" onClick={() => setFoo(foo + 1)}>{foo}</button>
        <hr />
        <label>color:
          <input type="color" value={color} onChange={handleChange} name="color" />
        </label>

        <label>background color:
          <input type="color" value={backgroundColor} onChange={handleChange} name="backgroundColor" />
        </label>

        <label>font
          <select value={fontFamily} onChange={handleChange} name="fontFamily">
            <option>serif</option>
            <option>sans-serif</option>
            <option>cursive</option>
            <option>fantasy</option>
            <option>monospace</option>
          </select>
        </label>

        <button>update ui</button>

        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas adipisci deserunt labore et nihil, soluta cumque voluptas accusantium maxime voluptate distinctio aspernatur corporis fugiat dicta molestiae neque rerum aut. Perferendis quis reiciendis nobis aperiam architecto itaque. Totam dolorum accusantium dolorem quis consectetur vitae voluptate optio, velit, consequatur repellendus debitis dolores nemo iure quas aut recusandae est, voluptatem cum! Culpa unde labore enim exercitationem, porro debitis architecto quod minus! Facere harum corporis placeat dolorum, soluta maxime, tempore quibusdam quisquam enim fuga excepturi omnis quae voluptates itaque dignissimos officia laborum aperiam aut distinctio aliquid. Quisquam quam numquam aliquid sunt debitis quos adipisci et optio perspiciatis minus facilis suscipit quae reprehenderit, pariatur eveniet id blanditiis, similique molestias voluptatibus maiores eaque. Culpa quis molestiae, a dolor enim cupiditate omnis unde eum sunt in doloribus, id provident inventore explicabo libero, veniam numquam sed. Fuga nam delectus necessitatibus veniam, animi tenetur autem odio laboriosam deleniti soluta? Sint similique quae officiis, in at perferendis laudantium quasi tenetur esse cumque explicabo impedit qui rem fuga expedita ab itaque molestiae consequatur adipisci vero eos consectetur perspiciatis. Minus adipisci in quam error perspiciatis. Odit quasi optio perferendis facilis fuga dolorum inventore, molestiae eos atque est delectus laudantium iure possimus adipisci impedit ex esse ipsum quisquam reprehenderit asperiores neque. Placeat sit vero at dolorem iste quidem. Numquam repellat voluptatem aut quam ducimus praesentium. Nulla dolor temporibus quia commodi inventore! Similique debitis optio magnam dignissimos officia asperiores quas nostrum, odit labore ipsum obcaecati ad. Officia vel expedita ex, et doloribus recusandae eligendi reprehenderit minima iusto voluptate ab dolores accusamus ducimus, repellendus hic maxime facere labore animi nobis? Quod assumenda quibusdam corporis debitis ipsam totam nam aspernatur laboriosam possimus in repellendus fuga ducimus voluptatem sequi, corrupti, sed nostrum molestiae libero perspiciatis architecto ullam quisquam. Deserunt ab dolor impedit possimus enim cum eligendi sequi atque, dolores sint nesciunt inventore blanditiis labore officiis fuga animi at velit sunt quidem iusto modi odio repellat, laudantium soluta? Recusandae ipsa dolorem blanditiis veritatis maxime mollitia, et corporis nemo cum sit odio nostrum, odit officiis at quisquam maiores earum sed, facilis alias sint! Molestias neque cumque modi facere facilis. Consectetur iusto placeat ipsam mollitia itaque veniam. Illum maxime esse asperiores, cumque aut ipsum nemo veritatis. Dignissimos, magnam expedita. Porro sunt doloremque officiis necessitatibus, pariatur veniam, dolorum error officia accusamus ipsam dolor iusto saepe excepturi. Soluta vel ducimus assumenda sit ex cumque inventore officiis labore, aperiam quisquam ullam reiciendis temporibus dolores quae saepe nobis sapiente. Vitae quasi odio, ad placeat accusamus, facilis minus maxime laudantium aut neque repellendus sequi doloribus expedita quas sunt, libero atque magnam! Sed placeat aperiam officiis. Aperiam labore culpa illo maxime sint itaque autem officia distinctio quis? Possimus, dignissimos quaerat in consectetur nesciunt nostrum atque mollitia. At vel repellat corporis voluptatem libero vero ad non facilis nam dicta porro hic quidem, ratione id aliquid odit aperiam numquam distinctio illo ipsa cum amet quaerat quae nemo! Eos qui natus minus, quae debitis minima nihil animi aperiam non vitae assumenda cupiditate reprehenderit dolor similique delectus cum doloribus ullam.</p>
      </form>
    </>
  );
}*/
