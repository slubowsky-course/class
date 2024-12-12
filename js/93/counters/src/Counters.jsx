import React, { Component } from 'react'
import CounterComponent from './CounterComponent'
import Total from './Total';

export default class Counters extends Component {
  render() {
    return (
      <>
        <div>Counters</div>
        {this.props.counters.map(c => <CounterComponent key={c.id} counter={c} incrementCount={this.props.incrementCount}/>)}
        {/*<Total total={this.state.counters.reduce((a, c) => a + c.count, 0)}/>*/}
      </>
    )
  }
}
