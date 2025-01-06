import React from 'react';
import Person from './Person';

interface WelcomeProps {
  person: Person
}

export default function Welcome(props: WelcomeProps) {
  const {first, last} = props.person;
  return (
    <div>Welcome {first} {last}</div>
  )
}
