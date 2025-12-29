import { memo } from 'react'

const Greeting = memo(function (prop) {
  console.log('Greeting rendered');

  return (
    <div>Hello {prop.name}</div>
  )
});

export default Greeting;
