import React, { Component } from 'react'
import CounterComponent from './CounterComponent'

export default class Counters extends Component {
  state = {
    counters: [
      {id: 1, count: 5},
      {id: 2, count: 10}
    ]
  };

  incrementCount = counter => {
    counter.count++;
    this.setState({
      //counters: this.state.counters
    });
  }

  render() {
    return (
      <>
        <div>Counters</div>
        {this.state.counters.map(c => <CounterComponent key={c.id} counter={c} incrementCount={this.incrementCount}/>)}
      </>
    )
  }
}
