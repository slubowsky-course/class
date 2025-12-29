import { useState } from "react";
import useLocalStorage from "./useLocalStorage";

export default function useFormLocalStorage(key, defaults) {
  const [state, setState] = useLocalStorage(key, defaults);

  return [state,
    /*setState*/
    e => {
      setState({
        ...state,
        [e.target.name]: e.target.value
      });
    }
  ];
}
