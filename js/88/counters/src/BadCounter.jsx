import React, { useState } from 'react'

export default function BadCounter() {
  const [counter, setCounter] = useState({ count: 0 });
  const [words, setWords] = useState(['apple']);

  const handleClick = () => {
    //counter.count++;
    const newCounter = {...counter, count: counter.count + 1};
    setCounter(newCounter);

    //words.push(''+counter.count);
    const newWords = [...words, '' + counter.count];
    setWords(newWords);
  }

  return (
    <>
      <div>{counter.count}</div>
      {words.map(w => <span>{w}</span>)}
      <button onClick={handleClick}>click me</button>
    </>
  )
}
