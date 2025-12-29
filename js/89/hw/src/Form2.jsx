import React, { useState } from 'react'
import useForm from './useForm'

export default function Form2() {
  /*const [state, setState] = useState({
    name: 'Donald',
    age: 82
  });

  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  }*/

  const [state, setState] = useForm({
    name: 'Donald',
    age: 82
  });

  return (
    <>
      <label>
        name: <input name="name" value={state.name} onChange={/*handleChange*/ setState} />
      </label>
      <label>
        age: <input name="age" type="number" value={state.age} onChange={/*handleChange*/ setState} />
      </label>
    </>
  )
}
