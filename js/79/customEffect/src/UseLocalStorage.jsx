import {useState} from 'react';

const useLocalStorage = (key, defaultValues) => {
  const [items, setItems] = useState(JSON.parse(localStorage.getItem(key)) ?? defaultValues);

  return [
    items,
    newItems => {
      setItems(newItems);
      localStorage.setItem(key, JSON.stringify(newItems));
    }
  ]
}

export default useLocalStorage;
