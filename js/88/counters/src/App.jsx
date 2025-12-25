import { PureComponent } from 'react'
import './App.css'
import Counters from './Counters'
import TotalComponent from './TotalComponent'
import BadCounter from './BadCounter'

export default class App extends PureComponent {
  state = {
    counters: [
      { id: 1, count: 5 },
      { id: 2, count: 10 }
    ],
    foo: 0
  }

  constructor() {
    super();
    Object.freeze(this.state.counters);
    this.state.counters.forEach(c => Object.freeze(c));
  }

  incrementCounter = counter => {
    //counter.count = counter.count + 1;
    //this.setState({});

    /*if(counter.count > 5) {
      counter.count++;
    }*/
    //this.state.counters.push({});

    const newCounter = { ...counter, count: counter.count + 1 };
    const newCounters = [...this.state.counters];
    newCounters[newCounters.indexOf(counter)] = newCounter;

    Object.freeze(newCounter);
    Object.freeze(newCounters);

    this.setState({
      counters: newCounters
    });

    console.log(this.state.counters);
  }

  /*shouldComponentUpdate(newProps, newState) {
    return newState !== this.state;
  }*/

  componentDidMount() {
    this.interval = setInterval(() => {
      /*this.setState({
        foo: this.state.foo + 1
      });*/
      this.state.foo++;
      this.setState({});
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <>
        {this.state.foo}
        <Counters counters={this.state.counters} incrementCounter={this.incrementCounter} />
        <TotalComponent total={this.state.counters.reduce((a, c) => a + c.count, 0)} />
        <hr />
        <BadCounter />
      </>
    );
  }
}
