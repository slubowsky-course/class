import './App.css';
import { jsx as _jsx } from "react/jsx-runtime";
import Welcome, { WelcomeC } from './Welcome';
import Clock from './Clock';

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
    <WelcomeC first="Donald" last="Trump" />
    <WelcomeC first="JD" last="Vance" />
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
