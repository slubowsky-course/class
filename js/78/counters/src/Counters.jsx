import { useState } from 'react'
import Counter from './Counter';
import Total from './Total';

export default function Counters() {

  const [counters, setCounters] = useState([
    { id: 1, count: 5 },
    { id: 2, count: 10 }
  ])

  const handleIncrementCounter = (counter) => {
    const newCounter = { ...counter, count: counter.count + 1 }
    const newCounters = [...counters];
    const index = newCounters.findIndex(c => c.id === counter.id);
    newCounters[index] =  newCounter;
    setCounters(newCounters);
  }

  return (
    <div>
      {counters.map(c => <Counter key={c.id} counter={c} onIncrement={handleIncrementCounter}/>)}
      <Total total={counters.reduce((a, c) => a + c.count, 0)}/>
    </div>
  )
}
