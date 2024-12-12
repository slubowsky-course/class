//import { useState } from 'react'
import useForm from './useForm';

export default function Form() {
  /*const [state, setState] = useState({
    name: '',
    age: 0
  });

  const handleInputChanged = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }*/

  const [state, setState] = useForm({
    name: 'Joe',
    age: 100
  });

  return (
    <div>
      name: <input name="name" value={state.name} onChange={setState} />
      age: <input name="age" value={state.age} onChange={setState} type="number" />
    </div>
  )
}
