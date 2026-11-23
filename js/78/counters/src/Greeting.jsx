import { memo } from 'react'

const Greeting = memo(function Greeting(props) {
  console.log('Greeting rendering');

  return (
    <div>Hello {props.name}</div>
  )
});

export default Greeting;
