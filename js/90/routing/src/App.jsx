
import { Outlet } from 'react-router'
import './App.css'
import Header from './Header'

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
