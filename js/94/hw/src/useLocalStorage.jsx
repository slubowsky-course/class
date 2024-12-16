import { useEffect, useState } from 'react';

export default function useLocalStorage(key, defaults) {
  const [state, setState] = useState(JSON.parse(localStorage.getItem(key)) ?? defaults);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [
    state,
    setState
  ]
}
