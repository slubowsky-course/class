import { useState, useEffect } from 'react';

export default function CounterF() {
  /*const stateStuff = useState(5);

  console.log(stateStuff)/;

  return (
    <button onClick={() => stateStuff[1](stateStuff[0] + 1)}>{stateStuff[0]}</button>
  )*/

  const [count, setCount] = useState(5);
  const [count2, setCount2] = useState(10);

  useEffect(() => {
    console.log('use effect');
    document.title = 'F - ' + count + ' ' + count2;
  }, [count, count2]);

  const [foo, setFoo] = useState(1);
  useEffect(() => {
    const interval = setInterval(() => {
      setFoo(foo + 1);
    }, 1000);

    return () => {
      console.log('cleaning up interval');
      clearInterval(interval);
    };
  });

  return (
    <>
      <div>{foo}</div>
      <button onClick={() => setCount(count + 1)}>{count}</button>
      <button onClick={() => setCount2(count2 + 1)}>{count2}</button>
    </>
  );

  /*const [{ count, count2 }, setCounts] = useState({
    count: 5,
    count2: 10
  });*/

  /*const [counts, setCounts] = useState({
    count: 5,
    count2: 10
  });
  const { count, count2 } = counts;

  return (
    <>
      {/*<button onClick={() => setCounts({ count: count + 1, count2 })}>{count}</button>
      <button onClick={() => setCounts({ count, count2: count2 + 1 })}>{count2}</button>* /}

      <button onClick={() => setCounts({ ...counts, count: count + 1 })}>{count}</button>
      <button onClick={() => setCounts({ ...counts, count2: count2 + 1 })}>{count2}</button>
    </>
  );*/
}
