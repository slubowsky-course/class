import './App.css';
import Clock from './Clock.jsx';
// import React from 'react';
import Welcome from './Welcome.jsx';
import WelcomeC from './WelcomeC.jsx';

// import { jsx as _jsx } from "react/jsx-runtime";

const potus = {
  first: 'Donald',
  last: 'Trump'
};

function formatName(person) {
  // return `${person.first} - ${person.last}`;

  //const theJsx = <span>{person?.first} - {person?.last}</span>;

  const theJsx = person ? <span>{person.first} - {person.last}</span> : <span>nobody</span>

  console.log(theJsx);
  return theJsx;
}

function App() {
  return (
    <>
      <h1>Hello {formatName(potus)} !!</h1>
      <h1>Goodbye</h1>

      <Welcome first="Donald" last="Trump" />
      <Welcome first="JD" last="Vance" />

      <WelcomeC first="Donald" last="Trump" />

      <Clock />
    </>
  )

  /*return /*#__PURE__* /_jsx("h1", {
    children: "Hello World!!"
  });*/
}

export default App
