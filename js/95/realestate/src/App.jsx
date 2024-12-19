import './App.css';
import { Link, Outlet } from 'react-router';
import Header from './Header';

function App() {
  return (
    <>
      <Header />

      <hr />
      <Outlet />
    </>
  )
}

export default App
