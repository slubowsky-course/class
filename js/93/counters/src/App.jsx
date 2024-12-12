import { PureComponent } from 'react'
import './App.css'
import Counters from './Counters'
import Total from './Total'

class App extends PureComponent {
  /*state = {
    counters: [
      { id: 1, count: 5 },
      { id: 2, count: 10 }
    ]//,
    //foo: 0
  };*/

  constructor(props) {
    super(props);

    const counters = [
      { id: 1, count: 5 },
      { id: 2, count: 10 }
    ];

    Object.freeze(counters);
    counters.forEach(c => Object.freeze(c));

    this.state = {
      counters
    };
  }

  incrementCount = counter => {
    //if (counter.count > 5) {
      //counter.count++;
    //}

    /*this.setState({
      //counters: this.state.counters
    });*/
    const newCounter = { ...counter, count: counter.count + 1 };
    Object.freeze(newCounter);

    const newCounters = [...this.state.counters];
    newCounters[newCounters.indexOf(counter)] = newCounter;
    Object.freeze(newCounters);

    this.setState({
      counters: newCounters
    });
  }

  //componentDidMount() {
  //setInterval(() => {
  /*this.setState({
    foo: this.state.foo + 1
  });*/
  //this.state.counters[0].count++

  //this.state.counters.push(5);
  //}, 1000)
  //}

  /*shouldComponentUpdate(newProps, newState) {
    return newState.counters !== this.state.counters;
  }*/

  render() {
    return (
      <>
        <h1>{this.state.foo}</h1>
        <Counters counters={this.state.counters} incrementCount={this.incrementCount} />
        <Total total={this.state.counters.reduce((a, c) => a + c.count, 0)} />
      </>
    )
  }
}

export default App
