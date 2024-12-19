import {Link} from 'react-router';

export default function Navbar() {
  return (
    <nav>
      <Link to="/">home</Link> | <Link to="/buy">buy</Link> | <Link to="/sell">sell</Link> | <Link to="/foo">foo</Link>
    </nav>
  )
}
