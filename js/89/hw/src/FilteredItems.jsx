import React, { useEffect, useMemo, useState } from 'react'

export default function FilteredItems() {
  const [foo, setFoo] = useState(1);
  const [filter, setFilter] = useState('');
  const [items, setItems] = useState(['apple', 'orange', 'pear']);

  //console.log('fitering items');
  //const filteredItems = items.filter(i => i.includes(filter));

  /*const [filteredItems, setFilteredItems] = useState([]);
  useEffect(() => {
    console.log('filtering items');
    setFilteredItems(items.filter(i => i.includes(filter)));
  }, [filter]);*/

  const filteredItems = useMemo(() => {
    console.log('filtering items');
    return items.filter(i => i.includes(filter));
  }, [filter]);

  console.log('rendering...');

  return (
    <>
      <button onClick={e => setFoo(foo + 1)}>{foo}</button>
      <input value={filter} onChange={e => setFilter(e.target.value)} />
      <ul>
        {filteredItems.map(i => <li key={i}>{i}</li>)}
      </ul>
    </>
  )
}
