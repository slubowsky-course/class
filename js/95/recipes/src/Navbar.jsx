
import { Link } from 'react-router';

export default function Navbar() {
  return (
    <nav><Link to="/">recipes</Link> | <Link to="/foo">foo</Link></nav>
  )
}