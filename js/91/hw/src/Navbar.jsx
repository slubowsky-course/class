import {NavLink} from 'react-router';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/buy">Buy</NavLink></li>
        <li><NavLink to="/sell">Sell</NavLink></li>
        <li><NavLink to="/foo">Foo</NavLink></li>
      </ul>
    </nav>
  )
}
