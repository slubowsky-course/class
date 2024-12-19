import { useRouteError } from 'react-router';

export default function Error() {
  const error = useRouteError();
  console.dir(error);
  return (
    <div>
      <h1>OOPS - Error!!!</h1>
      <h2>{error.status} - {error.statusText} - {error.message}</h2>
    </div>
  )
}
