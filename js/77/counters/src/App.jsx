import { useEffect, useState } from 'react'
import './App.css'
import Counter from './Counter';
import Counters2 from './Counters2';

export default function App() {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);

  useEffect(() => {
    document.title = `youve clicked ${count} ${count2} times`;

    return () => {
      console.log('cleanup');
    }
  }, [count, count2]);

  return (
    <>
      <button onClick={() => setCount(count + 1)}>{count}</button>
      <button onClick={() => setCount2(count2 - 1)}>{count2}</button>

      <Counter />
      <Counters2 />
    </>
  );
}
