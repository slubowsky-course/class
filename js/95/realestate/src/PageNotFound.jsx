import { useEffect } from 'react';
import {Link, useNavigate} from 'react-router';

export default function PageNotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    foo();
    setTimeout(() => {
      navigate('/', {replace: true});
    }, 2000);
  }, [navigate]);

  return (
    <>
    <div>404. This is not the page you are looking for...</div>
    <Link to="/buy">Click here to see some great houses for sale</Link>
    </>
  )
}
