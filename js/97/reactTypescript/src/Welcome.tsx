import React, { useState } from 'react';
import Person from './Person';

interface WelcomeProps {
  person: Person
}

export default function Welcome(props: WelcomeProps) {
  const [showing, setShowing] = useState(true);
  const [user, setUser] = useState<Person>();

  const {first, last} = props.person;
  return (
    <div>Welcome {first} {last}
    {showing && <span> Happy to have you here</span>}
    <button onClick={() => setShowing(!showing)}>{showing ? 'hide' : 'show'}</button>
    <hr/>
    <button onClick={() => setUser(props.person)}>login</button>
    {user && <div>you are logged in as {user.first} {user.last}</div>}
    {!user && <div>you are not logged in yet</div>}
    <hr/>
    
    </div>
  )
}
