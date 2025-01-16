import { Link, useParams } from 'react-router';
import './Header.css';

export default function Header() {
  const { name } = useParams();

  return (
    <>
      <header>
        <h1>PCS Blogs</h1>
        <nav>
          <ul>
            <li><Link to="/">blogs</Link></li>
          </ul>
        </nav>
        {name && <h2>{name}s blog</h2>}
      </header>
      <hr />
    </>
  )
}
