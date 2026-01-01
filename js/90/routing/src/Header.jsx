import './Header.css';
import { Link, NavLink } from 'react-router';

export default function Header() {
  return (
    <header>
      <h1>PCS App</h1>
      <Link to="/">home</Link> | <NavLink to="/aboutUs">about us</NavLink> | <NavLink to="/contactUs">contact us</NavLink> | <NavLink to="/foo">foo</NavLink>
    </header>
  );
}
