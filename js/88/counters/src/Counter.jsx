import React, { Component } from 'react'

export default class Counter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { count } = this.props.counter;
    return (
      <button onClick={() => this.props.incrementCounter(this.props.counter)}>{count}</button>
    )
  }
}
