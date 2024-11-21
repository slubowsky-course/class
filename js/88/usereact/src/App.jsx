import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { jsx as _jsx } from "react/jsx-runtime";
//import React from 'react';
import Welcome, { Welcome2 } from './Welcome';

function App() {


  const theJSX = (
    <>
      <h2>PCS</h2>
      <h5>Hello World!</h5>
      <Welcome first="Joe" last="Biden" />
      <Welcome2 first="Donald" last="Trump" />
      <Welcome2 />
    </>
  );

  console.dir(theJSX);

  return theJSX;

  /*return _jsx("h5", {
    children: "Hello World!"
  });*/
}

export default App
