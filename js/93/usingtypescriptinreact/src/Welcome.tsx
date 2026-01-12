import { useState } from "react";
import type Person from "./Person";

interface WelcomeProps {
  person: Person;
  greeting: string;
}

export default function Welcome(props: WelcomeProps) {
  const {person: {first, last, age}, greeting} = props;

  const [showing, setShowing] = useState(true);
  const [user, setUser] = useState<Person>();
  const [filter, setFilter] = useState('');

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e);
    setFilter(e.target.value);
  }

  return (
    <>
      {showing && <div>{greeting} {first} {last} {age}</div>}
      <button onClick={() => setShowing(!showing)}>{showing ? 'hide' : 'show'}</button>


      <button onClick={() => setUser(props.person)}>login</button>

      {user && <div>You are logged in as {user.first} {user.last}</div>}

      {!user && <div>You are not logged in</div>}

      <input value={filter} onChange={handleInputChange} />
    </>
  )
}
