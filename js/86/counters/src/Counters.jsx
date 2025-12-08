import React, { Component } from 'react'
import Counter from './Counter'

export default class Counters extends Component {
  state = {
    counters: [
      { id: 1, count: 5 },
      { id: 2, count: 10 }
    ]
  }

  incrementCounter = counter => {
    counter.count = counter.count + 1;
    this.setState({});
  }

  render() {
    return (
      <>
        {this.state.counters.map(c => <Counter key={c.id} counter={c} incrementCounter={this.incrementCounter} />)}
      </>
    )
  }
}
