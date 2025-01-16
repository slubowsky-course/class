import { useRouteError } from "react-router"

export default function ErrorPage(/*props*/) {
  // const {error} = props;
  const error = useRouteError();

  return (
    <div className="error">OOPS - {error.message}</div>
  )
}

// should have prop types (or typescript)
