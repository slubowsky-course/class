import { useState } from 'react'

export default function useForm(key, defaults) {
  const [state, setState] = useState(JSON.parse(localStorage.getItem(key)) ?? defaults);

  return [
    state,
    //setState
    e => {
      const newState = {
        ...state,
        [e.target.name]: e.target.value
      };
      setState(newState);
      localStorage.setItem(key, JSON.stringify(newState));
    }
  ]
}
