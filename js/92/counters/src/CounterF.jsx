import { useState, useEffect } from 'react';

export default function CounterF() {
  /*const stateStuff = useState(0);

  return (
    <button onClick={() => stateStuff[1](stateStuff[0] + 1)}>{stateStuff[0]}</button>
  )*/

  const [count, setCount] = useState(5);
  const [count2, setCount2] = useState(0);

  useEffect(() => {
    console.log('useEffect called');
    document.title = `F count is ${count} and ${count2}`;
  }, [count, count2]);

  const [foo, setFoo] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      setFoo(foo + 1)
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  })

  return (
    <>
    <h1>{foo}</h1>
      <button onClick={() => setCount(count + 1)}>{count}</button>
      <button onClick={() => setCount2(count2 + 1)}>{count2}</button>
    </>
  );

  /*const [state, setState] = useState({
    count: 5,
    count2: 6
  });

  return (
    <>
      {/*<button onClick={() => setState({ count: state.count + 1, count2: state.count2 })}>{state.count}</button>
      <button onClick={() => setState({ count: state.count, count2: state.count2 + 1 })}>{state.count2}</button>* /}

      <button onClick={() => setState({ ...state, count: state.count + 1 })}>{state.count}</button>
      <button onClick={() => setState({ ...state, count2: state.count2 + 1 })}>{state.count2}</button>
    </>
  );*/
}
