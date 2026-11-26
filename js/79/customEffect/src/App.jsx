import React, { useState } from 'react';
import foo from './Foo';
import useLocalStorage from './UseLocalStorage';

export default function App() {
  foo();

  /*const [colors, setColors] = useState(JSON.parse(localStorage.getItem('colors')) ?? {
    color: 'black',
    backgroundColor: 'white'
  });*/
  const [colors, setColors] = useLocalStorage('colors', {
    color: 'black',
    backgroundColor: 'white'
  });

  const handleChange = e => {
    const newColors = { ...colors, [e.target.name]: e.target.value }
    setColors(newColors);
    //localStorage.setItem('colors', JSON.stringify(newColors));
  };

  const [count, setCount] = useLocalStorage('count', {
    count: 500
  });

  return (
    <div style={{ color: colors.color, backgroundColor: colors.backgroundColor }}>
      <button onClick={() => setCount({count: count.count + 1})}>{count.count}</button>
      <input name="color" type='color' value={colors.color} onChange={handleChange} />
      <input name="backgroundColor" type='color' value={colors.backgroundColor} onChange={handleChange} />

      Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium at repellendus nulla beatae maiores. Cum nemo ea cumque autem! Impedit illum ut id autem minima molestiae labore omnis quas iste dolor exercitationem est molestias fuga corporis suscipit a sapiente itaque praesentium distinctio ipsum ipsa obcaecati, voluptatem expedita mollitia? Minus deleniti nobis, voluptatum exercitationem quidem labore omnis animi voluptates enim. Aut maiores officia animi eaque ipsum alias corporis laborum rerum consequuntur repellat, quod reprehenderit aliquid, nesciunt odio possimus fugit vitae! Consectetur dolores commodi dolorem doloremque architecto voluptate magnam itaque quibusdam, doloribus animi optio consequuntur cum a provident necessitatibus nesciunt odio esse dicta maxime sapiente mollitia excepturi qui? Vel, beatae. Sequi reiciendis, totam provident voluptatem molestiae voluptates consectetur eius sunt quibusdam doloremque qui dolores adipisci nulla maiores id iste deserunt ducimus perspiciatis, assumenda, nihil quam excepturi suscipit? Nostrum nemo sunt similique, aut at asperiores aliquid pariatur quos non sed, temporibus, dicta eligendi nihil eos fugiat. Laudantium soluta facilis fugiat porro? Adipisci quos qui ipsam cupiditate necessitatibus animi quidem similique accusantium enim cumque delectus totam iure sed deleniti ratione nisi, laboriosam facere reiciendis consequuntur ullam, quaerat nam libero! Quis expedita consequatur iusto voluptate id hic provident, eius doloribus perferendis neque nesciunt dolorem repellendus tempora quidem minima earum perspiciatis, iste aspernatur nulla! Ex, dolores vel harum voluptatibus eaque aspernatur consequuntur illo at laboriosam magni delectus quisquam temporibus dolorem distinctio blanditiis minus quis ducimus quasi a enim maxime ab incidunt inventore necessitatibus. Expedita esse dicta repudiandae vel vitae blanditiis hic, et quibusdam ipsa omnis ipsam?
    </div>
  )
}
