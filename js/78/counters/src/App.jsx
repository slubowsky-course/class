import { useState, useEffect } from 'react'
import Counters from './Counters'
import Greeting from './Greeting';

export default function App() {
  const [foo, setFoo] = useState(0);
  const [foo2, setFoo2] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFoo(prev => prev + 1);
    }, 3000);

    const interval2 = setInterval(() => {
      setFoo2(prev => prev + 1);
    }, 10000);

    return () => {
      clearInterval(interval);
      clearInterval(interval2);
    }
  }, []);

  return (
    <div>
      {foo} {foo2}
      <Counters />
      <Greeting name={foo2} />
    </div>
  )
}
