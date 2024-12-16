import './Navbar.css';
import { NavLink } from 'react-router';

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li><NavLink to="/">home</NavLink></li> | <li><NavLink to="/about">about</NavLink></li> | <li><NavLink to="/contactUs">contact us</NavLink></li> | <li><NavLink to="/foo">foo</NavLink></li>
      </ul>
    </nav>
  )
}
