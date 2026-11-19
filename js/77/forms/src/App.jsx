import { useState } from 'react';
import './App.css';

export default function App() {
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [age, setAge] = useState('0');

  function handleSubmit(e) {
    e.preventDefault();
    console.log('Do something with', first, last, age, 'here');
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        first: <input value={first} onChange={e => setFirst(e.target.value)} />
        <br />
        last: <input value={last} onChange={e => setLast(e.target.value)} />
        <br />
        age: <input value={age} onChange={e => setAge(e.target.value)} type="number" />
        <br />

        <button>submit</button>
      </form>
      <hr />
      <Form2 />
      <hr />
      <Form3 />
    </>
  )
}


export function Form2() {
  const [formData, setFormData] = useState({
    first: 'Donald',
    last: 'Trump',
    age: 80
  });

  function handleChange(e) {
    console.log('handle change', e.target.name);

    //const newState = { ...formData };
    //newState[e.target.name] = e.target.value;

    setFormData(/*newState*/{ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    //console.log('Do something with', first, last, age, 'here');
  }

  return (
    <form onSubmit={handleSubmit}>
      first: <input name="first" value={formData.first} onChange={/*e => setFormData({
        ...formData, first: e.target.value
      })*/ handleChange} />
      <br />
      last: <input name="last" value={formData.last} onChange={/*e => setFormData({
        ...formData, last: e.target.value
      })*/ handleChange} />
      <br />
      age: <input name="age" value={formData.age} onChange={/*e => setFormData({
        ...formData, age: e.target.value
      })*/ handleChange} type="number" />
      <br />

      <button>submit</button>
    </form>
  )
}


export function Form3() {
  function handleSubmit(e) {
    e.preventDefault();

    console.log(e.target, e.currentTarget);
    const formData = new FormData(e.target);
    console.log(formData.entries().forEach(d => {
      console.log(d);
    }));
  }

  return (
    <form onSubmit={handleSubmit}>
      first: <input name="first" />
      <br />
      last: <input name="last" />
      <br />
      age: <input name="age" type="number" />
      <br />

      <button>submit</button>
    </form>
  )
}
