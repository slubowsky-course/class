import './App.css';
import { Outlet } from 'react-router';
import Header from './Header'

export default function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}
