import Address from './Address';
import Address2 from './Address2';
import './App.css';

function App() {

  const address = {
    street: '1600 Pennsylvania Ave',
    city: 'Washington',
    state: 'D.C.',
    zip: '12345'
  }

  const { street, city, state, zip } = address;

  return (
    <>
      <h1>hello world!</h1>
      <Address street={street} city={city} state={state} zip={zip} />

      <Address2 address={address} />
    </>
  )
}

export default App
