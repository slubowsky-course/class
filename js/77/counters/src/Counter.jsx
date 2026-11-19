import { useState } from 'react';

let count = 0;

export default function Counter() {
  //const [count, setCount] = useState(0);

    return (
      <>
        <button onClick={() => /*setCount(count + 1)*/ count++}>{count}</button>
      </>
    )
}
