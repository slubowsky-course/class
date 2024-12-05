import { Component } from "react"

class App extends Component {
  state = {
    first: '',
    last: 'Biden',
    email: 'jbiden@whiehouse.gov',
    age: 92,
    concious: true
  };

  handleChange = e => {
    console.log('update', e.target.name);

    /*const newState = {};
    newState[e.target.name] = e.target.value;
    this.setState(newState);*/

    const v = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    this.setState({
      [e.target.name]: v
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log('handle submit of', this.state);
  }

  render() {
    const { first, last, email, age, concious } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div>first: <input value={first} onChange={this.handleChange} name="first" /></div>
        <div>last: <input value={last} onChange={this.handleChange} name="last" /></div>
        <div>email: <input type="email" value={email} onChange={this.handleChange} name="email" /></div>
        <div>age: <input type="number" value={age} onChange={this.handleChange} name="age" /></div>
        <div>concious <input type="checkbox" name="concious" checked={concious} onChange={this.handleChange} /></div>
        <button>submit</button>
      </form>
    );
  }
}

export default App
