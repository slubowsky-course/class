import { useEffect, useState } from "react";

export default function useLocalStorage(key, defaults) {
  const [state, setState] = useState(JSON.parse(localStorage.getItem(key)) ?? defaults);

  return [state,
    /*useState*/
    newState => {
      setState(newState);

      localStorage.setItem(key, JSON.stringify(newState));
    }
  ];
}
