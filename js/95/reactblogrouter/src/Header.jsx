import { Link } from 'react-router';
import './Header.css';

export default function Header() {
  return (
    <header>
      <h1>PCS Blog</h1>
      <h2 id="title"></h2>
      <nav>
        <ul>
          <li>
            <Link to="/">blogs</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
