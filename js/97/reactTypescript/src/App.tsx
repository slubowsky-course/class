import './App.css';
import Welcome from './Welcome';
import Person from './Person';
import Header from './Header';
import Highlight from './Highlight';
import Search from './Search';

const potus: Person = {
  first: 'Donald',
  last: 'Trump',
  age: 80
}

function App() {
  return (
    <>
    <Highlight>{[<Header>
        Hello World!
        </Header>]}</Highlight>
      <Highlight>
        <Header>
        Hello World!
        </Header>
        <Header>
        Hello World!
        </Header>
      </Highlight>
      <Welcome person={potus}/>
      <Search style={{backgroundColor: 'red', color: 'green'}}/>
    </>
  )
}

export default App