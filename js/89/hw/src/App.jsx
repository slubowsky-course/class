import './App.css';
import { Component } from 'react';
import Address from './Address';
import Welcome from './Welcome';
import Clock from './Clock';

const address = {
  street: '1600 Pennsylvania Ave',
  city: 'Washington',
  state: 'D.C.',
  zip: 12345
}

class App extends Component {
  state = {
    count: 1
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        count: this.state.count + 1
      });
    }, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <>
        <h1>hello world!</h1>
        {/*<Address street="1600 Pennsylvania Ave" city="Washington" state="D.C." zip="12345"/>*/}
        {/*<Address street={address.street} city={address.city} state={address.state} zip={address.zip} />*/}
        <Address address={address} />
        <Welcome name="Donald" />
        <Welcome name="Joe" />
        <h2>app count - {this.state.count}</h2>
        <Clock />
      </>
    );
  }
}

export default App
