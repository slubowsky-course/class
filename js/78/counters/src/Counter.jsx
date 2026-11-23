import { useState } from 'react'

export default function Counter(props) {
  // const [counter, setCounter] = useState(props.counter);

  return (
    <button onClick={() => props.onIncrement(props.counter)//() => {
      //counter.count = counter.count + 1;
      //setCounter(counter);
      //setCounter({ ...props.counter, count: props.counter.count + 1 })
      //}
    }>{props.counter.count}</button>
  )
}
