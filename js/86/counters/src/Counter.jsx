import React, { Component } from 'react'

export default class Counter extends Component {
  constructor(props) {
    super(props);

    /*this.state = {
      count: props.count
    }*/
  }

  /*handleClick = () => {
    /*this.setState({
      count: this.state.count + 1
    })* /
    this.props.counter.count = this.props.counter.count + 1;
    this.props.handleCounterUpdate();
  }*/

  render() {
    //const { count } = this.state;
    const {count } = this.props.counter;
    return (
      <button onClick={() => this.props.incrementCounter(this.props.counter)}>{count}</button>
    )
  }
}
