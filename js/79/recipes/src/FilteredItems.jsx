import { useEffect, useState, useMemo } from 'react'

export default function FilteredItems() {
  const [fruits, setFruits] = useState([
    'apple',
    'pear',
    'peach',
    'plum',
    'date'
  ]);

  const [filter, setFilter] = useState('');

  //console.log('filtering fruits');
  //const filteredFruits = fruits.filter(f => f.includes(filter));

  /*const [filteredFruits, setFilteredFruits] = useState(fruits);
  useEffect(() => {
    console.log('filtering fruits');
    setFilteredFruits(fruits.filter(f => f.includes(filter)));
  }, [filter]);*/

  const filteredFruits = useMemo(() => {
    console.log('filtering fruits');
    return fruits.filter(f => f.includes(filter));
  }, [filter, fruits]);

  console.log('rendering');

  return (
    <div>
      <input value={filter} onChange={e => setFilter(e.target.value)} />
      <ul>
        {filteredFruits.map(f => <li key={f}>{f}</li>)}
      </ul>
    </div>
  )
}
