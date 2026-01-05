import { Link } from 'react-router';

export default function NoPageFound() {
  return (
    <>
      <div>404 - No Page found</div>
      <Link to="/buy">Click here to see our amazing homes for sale</Link>
    </>
  )
}
