import { NavLink } from 'react-router';

export default function Header() {
  return (
    <>
      <header>
        <h1>PCS Recipes</h1>
      </header>
      <NavLink to="/">recipes</NavLink>
      <hr />
    </>
  );
}
