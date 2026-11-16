import {useState, useEffect} from 'react';

export default function CounterF() {
  /*const stateStuff = useState(5);

  console.log(stateStuff);

  setTimeout(() => {
    stateStuff[1](stateStuff[0] + 1);
  }, 2000);

  return (
    <div>{stateStuff[0]}</div>
  )*/

  const [count, setCount] = useState(5);

  /*useEffect(() => {
    console.log('in use effect');

    const interval = setInterval(() => {
      setCount(count + 1);
    }, 2000);

    return () => {
      console.log('cleanup called');
      clearInterval(interval);
    }
  },[count]);*/

  /*function handleClick() {
    console.log('in handleClick');

    setCount(count + 1);
  }*/

  return (
    <button onClick={/*handleClick*/
      () => setCount(count + 1)
    }>{count}</button>
  )
}
