import { Component } from 'react';
import './App.css';

export default class App extends Component {
  state = {
    first: 'Donald',
    last: 'Trump',
    age: 80,
    reelection: false
  }

  handleChange = (e) => {
    //console.log(e);
    //console.log('set first called');
    //console.log(e.target.name);

    /*const newState = {}
    newState[e.target.name] = e.target.value;
    this.setState(newState);*/

    //console.dir(e.target);

    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    this.setState({
      [e.target.name]: value
    });

  }

  render() {
    const { first, last, age, reelection } = this.state;

    //console.log(reelection);

    return (
      <form>
        <div>first: <input value={first} onChange={this.handleChange} name="first" /></div>
        <div>last: <input value={last} onChange={this.handleChange} name="last" /></div>
        <div>age: <input type="number" value={age} onChange={this.handleChange} name="age" /></div>
        <div>should run for third term<input type="checkbox" name="reelection" onChange={this.handleChange} checked={reelection}/></div>
      </form>
    );
  }
}
