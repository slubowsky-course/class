import './App.css';
import { jsx as _jsx } from "react/jsx-runtime";
import Welcome from './Welcome';
import Clock from './Clock';
import Welcome2 from './Welcome2';

const potus = {
  first: 'Donald',
  last: 'Trump'
};

function formatName(person) {
  //return `${person.first} ${person.last}`;

  return person ? (<span>{person?.first} {person?.last}</span>) : (<span>unknown</span>);
}

const jsx = (
  <>
    <div>hello {potus?.first} {potus?.last}!</div>
    <div>Hello {formatName(potus)}</div>
    <div>Goodbye world!</div>
    <Welcome first="Donald" last="Trump" />
    <Welcome first="JD" last="Vance" />
    <hr/>
    <Welcome2 />
    <Clock />
  </>
);

console.log(jsx);

function App() {
  return jsx;
  /*return /*#__PURE__* /_jsx("div", {
    children: "hello world!"
  });*/
}

export default App
