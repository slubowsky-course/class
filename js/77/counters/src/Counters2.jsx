import { useState } from 'react';

export default function Counters2() {
  const [counts, setCounts] = useState({
    count1: 5,
    count2: -5
  });

  return (
    <div>
      <button onClick={() => setCounts(/*{
        count1: counts.count1 + 1,
        count2: counts.count2
      }*/

      {...counts, count1: counts.count1 + 1 }

      )}>{counts.count1}</button>
      <button onClick={() => setCounts({
        count1: counts.count1,
        count2: counts.count2 - 1
      })}>{counts.count2}</button>
    </div>
  )
}
