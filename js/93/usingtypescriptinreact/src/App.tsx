import './App.css'
import Header from './Header';
import type Person from './Person';
import Welcome from './Welcome'

function App() {

  const potus:Person = {
    first: 'Donald',
    last: 'Trump',
    age: 85
  };

  return (
    <>
      <h1>React + Typescript</h1>
      <Welcome greeting="Hello" person={potus}/>

      <Header style={{color: 'red'}}>
        <h2>I am a child inside the header</h2>
        {5}
        Hello
      </Header>
    </>
  )
}

export default App
