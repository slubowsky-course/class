import './App.css';
import Address, { Address2 } from './Address';


function App() {

  const address = {
    street: "1800 Pennsylvania Ave",
    city: "Washington",
    state: "D.C.",
    zip: "12345"
  };

  const { street, city, state, zip } = address;

  return (
    <>
      <Address street={street} city={city} state={state} zip={zip} />

      <Address2 address={address} />
    </>
  )
}

export default App
