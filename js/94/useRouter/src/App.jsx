import { Outlet } from 'react-router';
import './App.css'
import Header from './Header';

function App() {

  /*style={p => {
          return {textDecoration: p.isActive ? "underline" : "none"}
        }}

     className={p => {
          return p.isActive ? "myIsActive" : ""
        }}
        */


  return (
    <>
      <Header />
      <hr />
      <Outlet />
    </>
  );
}

export default App
